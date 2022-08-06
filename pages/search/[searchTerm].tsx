import React, {useState} from 'react';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard';
import NoResult from '../../components/NoResult';
import { IUser , Video } from '../../types'
import { useRouter } from 'next/router';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/auth';



// interface Iprops { 
//     videos: {
//         user: IUser
//         video : Video[]
//     }
// }

    const Search = ({videos}:{ videos : Video[]}) => {
    const [isAccounts, setIsAccounts] = useState(false)

    const router = useRouter();
    const { searchTerm }: any = router.query;

    const accounts = isAccounts  ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts  ? 'border-b-2 border-black' : 'text-gray-400'

    // fetch all users from zustand Store
    const { allUsers } = useAuthStore()
    // filter users based on searched users
    const searchedAccounts =  allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log("SEARCHED USER" , searchedAccounts)

  return (
    <div className="w-full">
        <div className=" flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full bg-white">
            <p className={`text-xl font-semibold cursor-pointer mb-2 ${accounts}`} onClick={ () => setIsAccounts(true)}>Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer mb-2 ${isVideos}`} onClick={ () => setIsAccounts(false)}>Videos</p>
          </div>

          <div>
            {isAccounts ? (
                <div className="md:mt-16">
                    { searchedAccounts.length> 0 ? (
                        searchedAccounts.map((user : IUser , index) => (
                            <Link href={`/profile/${user._id}`} key={index}>
                              <div className="flex gap-3 p-2 hover:cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                              <div className="w-10 h-10 lg:h-15 lg:w-15">
                                  <Image 
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                    alt='User Profile'
                                  />
                                </div>
                                <div className="block ">
                                    <p className="flex gap-2 items-center justify-center text-primary lowercase text-md lg:text-xl font-bold">
                                      { user.userName.replaceAll(" ", "")}
                                      <GoVerified className="text-blue-400" />
                                    </p>
                                    <p className="capitalize text-gray-400  text-xs md:text-md ">
                                      {user.userName}
                                    </p>
                                </div>
                              </div>
                          </Link>  
                        ) )
                    ) : 
                        <NoResult text={`the account name ${searchTerm} does not exist`}/>
                        }
                </div>
            ):(
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    { videos.length ? (
                        videos.map((video: Video , index) => (
                         <VideoCard post={video} key={index}/>  
                        ))
                    ): (
                        <NoResult text={`No video results for ${searchTerm}`}/>
                    )}
                </div>
            )}
          </div>
    </div>
  )
}

export const getServerSideProps = async ( { params: { searchTerm }}: {params: {searchTerm: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
 
     return {
     props: {
       videos: res.data
     }
    }
}

export default Search