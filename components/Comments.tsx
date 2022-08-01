import React,  { Dispatch, SetStateAction }from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';  
import useAuthStore from '../store/auth';
import NoResult  from './NoResult';

// create interface for comment data types
interface IProps {
  isPostingComment: Boolean,
  comment: string;
  setComment: string;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[]
}

interface IComment { 
  comment: string;
  lenght?: number;
  _key: string;
  postedBy: { _ref: string; _id: string}
}

const Comments = ({comment, setComment, addComment, comments, isPostingComment}: IProps) => {

  const { userProfile }: any  = useAuthStore();
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-auto lg:h-[475px] ">
        {comments?.length ? (
          <div>
            videos
          </div>
        ): (
          <NoResult text={'No Comments! Be the first to comment on this post'}/>
        )}
      </div>
          {userProfile  && (
            <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
              <form onSubmit={addComment}className="flex gap-5" >
                <input 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add Comment"
                  className="bg-primary px-5 py-2 font-medium border-2 rounded-lg w-[400px] md:w-[600px] sm:w-[500px] lg:w-[350px] border-gray-100 focus:outline-none flex-1 focus:border-2 focus:border-gray-300 "
                />
                <button className=" text-md text-gray-400 border-2 rounded-lg px-3 " 
                  onClick={addComment}
                >
                    {isPostingComment ? " Commenting..." : "comment"}
                </button>
              </form>
            </div>
          )}
    </div>
  )
}

export default Comments