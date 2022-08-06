import React, { useState , useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResult from '../../components/NoResult';
import { IUser , Video } from '../../types';
import { BASE_URL } from '../../utils';


interface IProps {
  data: {
    user: IUser;
    userLikes: Video[];
    userPosts: Video[]
  }
  
}

const Profile = ({data}: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true);

  const { user , userLikes, userPosts } = data

  const videos = showUserVideos  ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos  ? 'border-b-2 border-black' : 'text-gray-400'
  const [videosList, setVideosList] = useState<Video[]>([])

  // useEffect hook to show videos based on Liked videos or user Videos
  useEffect(() => {
    if(showUserVideos){
      setVideosList(userPosts)
    }else {
      setVideosList(userLikes)
    }
  },[showUserVideos, userLikes , userPosts])

  return(
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className='flex gap-3  p-2 cursor-pointer font-semibold rounded'>
        <div className="w-16 h-16 md:h-20 md:w-20">
                <Image 
                  src={user.image}
                  width={120}
                  height={120}
                  className="rounded-full"
                  alt='User Profile'
                  layout='responsive'
                />
              </div>
              <div className="flex justify-center flex-col ">
                  <p className=" md:text-2xl tracking-wider flex gap-2 items-center justify-center text-primary lowercase text-md font-bold">
                     { user.userName.replaceAll(" ", "")}
                     <GoVerified className="text-blue-400" />
                  </p>
                  <p className="capitalize text-xl text-gray-400 ">
                    {user.userName}
                  </p>
              </div>     
        </div>
      </div>
      <div>
          <div className=" flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full bg-white">
            <p className={`text-xl font-semibold cursor-pointer mb-2 ${videos}`} onClick={ () => setShowUserVideos(true)}>videos</p>
            <p className={`text-xl font-semibold cursor-pointer mb-2 ${liked}`} onClick={ () => setShowUserVideos(false)}>Liked</p>
          </div>
          <div className="flex gap-6 flex-wrap md:justify-start">
              {videosList.length > 0 ? (
                videosList.map((post: Video , index: number) => (
                  <VideoCard post={post} key={index}/>
                ))
              ) : 
                  <NoResult text={`No ${showUserVideos ? '' : "Liked"} Videos Yet`}/>
              }
          </div>
        </div>
    </div>
  )
}

export const getServerSideProps = async ( { params: { id }}: {params: {id: string}}) => {
   const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
    props: {
      data: res.data
    }
  }
}

export default Profile;