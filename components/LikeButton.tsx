import React, { useState , useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthstore from '../store/auth';

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[]
}

const LikeButton = ({ handleLike , handleDislike, likes } : IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthstore()

    // filter through likes to check if likes._ref === user._id
    // this ensures whether our current user already liked or not 
    const filterLikes = likes?.filter((items) => items._ref === userProfile?._id)

    // useEffect to set already liked to true if user already liked video or false if not
    useEffect(() => {
        if(filterLikes?.length > 0) {
            setAlreadyLiked(true)
        }else {
            setAlreadyLiked(false)
        }
    },[ filterLikes , likes])

  return (
    <div className="flex gap-6">
        <div className="mt-4 flex flex-col justify-center items-center">
            {
                alreadyLiked ? (
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]" 
                        onClick={handleDislike}
                        >
                        <MdFavorite className="text-lg md:text-2xl cursor-pointer"/>
                    </div>
                ) : (
                    <div className="bg-primary rounded-full p-2 md:p-4" 
                        onClick={handleLike}
                        >
                        <MdFavorite className="text-lg md:text-2xl cursor-pointer"/>
                    </div>
                )
            }
            <p className=" text-md font-semibold ">
                {likes?.length || 0}
            </p>
        </div>
    </div>
  )
}

export default LikeButton