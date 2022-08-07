import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Linik from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel} from 'react-icons/md';
import { BsFillPlayFill,  BsFillPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../types';
import { BASE_URL } from '../../utils';
import Link from 'next/link';
import useAuthStore from '../../store/auth';
import Comments from '../../components/Comments';
import LikeButton from '../../components/LikeButton';

// create an interface type for postDetails , postDetails is collected below this page thorugh getServersideProps function
interface IProps {
    postDetails: Video
}

const Details = ({postDetails}: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [comment, setComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);


    // import userprofile from zustand for liking video 
    const { userProfile }: any = useAuthStore()

    const router = useRouter()
    
    const videoRef = useRef<HTMLVideoElement>(null)

    // if(!post) return null;

    // play/pause functionality
    const handlePlay = () => {
        if(playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        }else {
            videoRef?.current?.play()
            setPlaying(true)
        }
    }

    // mute/unmute functionality
    useEffect(() => {
        if( post && videoRef?.current){
            videoRef.current.muted = isMuted
        }   
    }, [isMuted, post])

    // handle like functionality
    const handleLike = async (like : boolean) => {
        if(userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`,
             { userId: userProfile?._id,
                postId:post._id,
                like
            })
            console.log("userProfile:" , userProfile._id)
            // spread the previos state of post and add a likes object and pass data.likes returned from our api
            setPost({...post, likes: data.likes})

           
             }
    }

    // add comments functionality
    const addComment = async (e) => {
        e.preventDefault();
        if(userProfile && comment) {
            setIsPostingComment(true)

             // PUT comment to backend using axios to that specific video we are commenting on 
            // using the video id
            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, 
                { 
                    userId: userProfile?._id,
                    comment
                }
            );
            setPost({...post, comments: data.comments})
            // clear user input
            setComment('')
            setIsPostingComment(false);

        }
    }


    return (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
            <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-no-repeat bg-cover bg-center">
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
                    <p className="cursor-pointer" onClick={() => router.back()}>
                        <MdOutlineCancel className=" text-white text-[35px]"/>
                    </p>
                </div>
                <div className="relative"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            className="h-full cursor-pointer"
                          
                            loop
                            ref={videoRef}
                            onClick={() => {}}
                            src={post.video.asset.url}
                        >

                        </video>
                    </div>
                    {
                        isHover && (
                            <div className="absolute top-[50%] left-[50%] ">
                        { 
                            !playing ? (
                                <button>
                                     <BsFillPlayFill className="text-6xl lg:text-8xl text-white cursor-pointer"
                                        onClick={handlePlay} />
                                </button>
                             
                            ) : (
                                <button>
                                     < BsFillPauseFill className="text-6xl lg:text-8xl text-white cursor-pointer"
                                        onClick={handlePlay}/>
                                </button>
                           
                            )
                        }
                        
                    </div>
                        )
                    }
                    
                </div>
                <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
                {isMuted ? (
                     <button onClick={() => {setIsMuted(false)}}>
                        <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
                     </button>
                    ) : (
                     <button onClick={() => {setIsMuted(true)}}>
                        <HiVolumeUp className="text-white text-2xl lg:text-4xl"/>
                     </button>
                 )}
                </div>
            </div> 
            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] ">
                <div className="lg:mt-15 mt-10">
                <div className='flex gap-3  p-2 cursor-pointer font-semibold rounded'>
                    <div className='ml-4 md:w-17 md:h-17 w-16 h-16'>
                        <Link href='#'>
                            <>
                            <Image
                                width={62}
                                height={62}
                                className="rounded-full"
                                src={post.postedBy.image}
                                alt="profile image"
                                layout='responsive'
                            />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                            <div className="flex mt-1 flex-col item-center gap-2">
                                <p className="flex gap-2 md:text-md font-bold text-primary">{post.postedBy.userName}
                                    <GoVerified className="text-blue-400 text-md"/>
                                </p>
                                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <p className="px-10 text-lg text-gray-600">{post.caption}</p>
                    <div className="mt-5 px-10 ">
                        {userProfile && (
                         <LikeButton
                             likes={post.likes}
                             handleLike={() => handleLike(true)}
                             handleDislike={() => handleLike(false)}
                          />
          
                        )}
                    </div>
                    <Comments
                        comment={comment}
                        setComment={setComment}
                        addComment={addComment}
                        isPostingComment={isPostingComment}
                        comments={post.comments}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

// get current video via its id
export const getServerSideProps = async ( { params: {id}}: { params: {id: string}}) => {
    console.log('THIS IS PARAMETER:', id)
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

    return{
        props: {postDetails: data}
    }

}

export default Details;