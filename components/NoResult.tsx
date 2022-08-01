import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
import { NextPage } from 'next';

interface IProps {
  text: string
}

const NoResult: NextPage<IProps> = ({text}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-5xl ">
      { text === 'No Comments! Be the first to comment on this post' ? (
              <BiCommentX/>
          ): (
            <MdOutlineVideocamOff/>
          )}
      </p>
      <p className="text-2xl text-center">
          {text}
        </p>
    </div>
  )
}

export default NoResult