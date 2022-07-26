import React, { useRef, useState } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp , HiVolumeOff } from 'react-icons/hi';
import {BsPlay, BsFillPlayFill , BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';


interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    const [isHover , setIsHover] = useState(false)
    const [playing , setPlaying ] = useState(false)
    const [ isMuted , setIsMuted] = useState(false)

        
    // add reference to our videos for playing and pausing + muting
    // reffs in react are like document.getElementById in dom
    const videoReff = useRef<HTMLVideoElement>(null)

    const onVideoClick = () => {
        if(playing) {
            videoReff?.current?.pause();
            setPlaying(false)
        }else {
            videoReff?.current?.play();
            setPlaying(true)
        }
    }

    console.log( post)
    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
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
                            <div className="flex item-center gap-2">
                                <p className="flex item-ceter gap-2 md:text-md font-bold text-primary">{post.postedBy.userName}
                                    <GoVerified className="text-blue-400 text-md"/>
                                </p>
                                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:ml-20 flex gap-4 relative">
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="rounded-3xl">
                    <Link href="#">
                        <video
                            ref={videoReff}
                            loop
                            className="lg:w[600px] h-[300px] md:h[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-500"
                            src={post.video.asset.url}
                        ></video>
                    </Link>
                    {isHover && (
                        <div className="relative bottom-12 left-16 cursor-pointer md:left-14 flex gap-10 lg:justify-between w-[100px] md:w[50px] p-3">
                            {playing ? (
                                <button onClick={onVideoClick} >
                                    <BsFillPauseFill 
                                        className="text-gray-400 text-2xl lg:text-4xl"/>
                                </button>
                            ) : (
                                <button onClick={onVideoClick} >
                                    <BsFillPlayFill
                                        className="text-gray-400 text-2xl lg:text-4xl"/>
                                </button>
                            )}
                             {isMuted ? (
                                <button onClick={() => {setIsMuted(false); videoReff?.current?.muted}}>
                                    <HiVolumeOff className="text-gray-400 text-2xl lg:text-4xl"/>
                                </button>
                            ) : (
                                <button onClick={() => {setIsMuted(true); videoReff?.current?.muted}}>
                                    <HiVolumeUp className="text-gray-400 text-2xl lg:text-4xl"/>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard