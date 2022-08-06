import React, { useRef, useState, useEffect } from 'react';
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

    // video play and pause
    const onVideoClick = () => {
        if(playing) {
            videoReff?.current?.pause();
            setPlaying(false)
        }else {
            videoReff?.current?.play();
            setPlaying(true)
        }
    }

    // video mute/unmute
    useEffect(() => {
        if(videoReff?.current) {
            videoReff.current.muted = isMuted
        }
    }, [isMuted])

    console.log( "VIDEO CARD POST " , post)
    return (
        <div className=' flex flex-col border-b-2 border-gray-300 pb-6'>
            <div>
                <div className='flex gap-3  p-2 cursor-pointer font-semibold rounded'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${post.postedBy._id}`}>
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
                        <Link href={`/profile/${post.postedBy._id}`} >
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
            <div className=" lg:ml-20  flex gap-4 relative">
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="rounded-3xl">
                    <Link href={`/details/${post._id}`}>
                        <video
                            ref={videoReff}
                            loop
                            className="lg:w-[600px] h-[400px] md:h[400px] lg:h-[530px] w-[226px] rounded-2xl cursor-pointer bg-gray-500"
                            src={post.video.asset.url}
                        ></video>
                    </Link>
                    {isHover && (
                        <div className="absolute bottom-2 left-10 cursor-pointer md:left-14 flex gap-10 lg:justify-between w-[100px] md:w[50px] p-3">
                            {playing ? (
                                <button onClick={onVideoClick} >
                                    <BsFillPauseFill 
                                        className="text-white text-2xl lg:text-4xl"/>
                                </button>
                            ) : (
                                <button onClick={onVideoClick} >
                                    <BsFillPlayFill
                                        className="text-white text-2xl lg:text-4xl"/>
                                </button>
                            )}
                             {isMuted ? (
                                <button onClick={() => {setIsMuted(false); }}>
                                    <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
                                </button>
                            ) : (
                                <button onClick={() => {setIsMuted(true);}}>
                                    <HiVolumeUp className="text-white text-2xl lg:text-4xl"/>
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