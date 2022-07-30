import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';  
import useAuthStore from '../store/auth';
import NoResult  from './NoResult';

const Comments = () => {
  const comments = []
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-auto lg:h-[475px] ">
        {comments.length ? (
          <div>
            videos
          </div>
        ): (
          <NoResult text={'No Comments! Be the first one to comment on this post'}/>
        )}
      </div>

    </div>
  )
}

export default Comments