import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md';
import { NextPage } from 'next';

interface IProps {
  text: string
}

const NoResult: NextPage<IProps> = ({text}) => {
  return (
    <div className="flex flex-col justify-center">
      {text}
    </div>
  )
}

export default NoResult