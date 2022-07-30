import React, { useState , useEffect} from 'react';
import  { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios'
import useAuthStore from '../store/auth'
import { client } from '../utils/client'

// lets import sanityAssetDocument to set the video asset data type so that typescript will
// the data type we are passing to the video asset
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState(' ');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);
    const router = useRouter()

    // get userProfile from zustand
    const {userProfile} : { userProfile: any} = useAuthStore()
    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.files)
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        // check to make sure user uploads correct file format
        if(fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file' , selectedFile , {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
             .then((data) => {
                setVideoAsset(data);
                console.log(videoAsset)
                setIsLoading(false)
             })
        }else {
            setIsLoading(true)
            setWrongFileType(true)
        }
    }

    // handle post function
    const  handlePost  = async () => {
        if(caption && videoAsset?._id && category ){
            setSavingPost(true)

            // create a document in database to save video
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type:'file', 
                    asset: {
                        _type:'reference',
                        _ref: videoAsset._id 
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type:'postedBy',
                    _ref: userProfile?._id
                },
                topic: category 
            }

            // push the document to localhost:3000/api/post backend
            await axios.post(`${BASE_URL}/api/post` , document)
            
            // then rout back to home page to see video after upload
            router.push('/')
        }
    }

  return (

    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 p-10 lg:pt-10 bg-[#f8f8f8] justify-center">
        <div className="bg-white  rounded-lg xl:h-[80vh] w-[100%] xl:w-[60%] flex gap-6 flex-wrap justify-between items-center p-10 pt-1 ">
            <div>
                <div>
                    <p className="text-2xl font-bold">Upload Video</p>
                    <p className="text-md text-gray-400">post a video to your account</p>
                </div>
                <div className="border-dashed rounded-xl border-4 border-grey-400 flex flex-col justify-center items-center outline-none mt-10 w-[250px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                    {isLoading ? (
                        <p>Uploading...</p>
                    ): (
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video 
                                        src={videoAsset.url}
                                        loop
                                        controls
                                        className="rounded-xl h-[450px] mt-16 bg-black"
                                    >

                                    </video>
                                </div>
                            ): (
                                <label className="cursor-pointer">
                                    <div className="flex flex-col items-center justify-centrer h-full">
                                        <div className="flex flex-col items-center justify-centrer">
                                            <p className="font-bold text-xl">
                                                <FaCloudUploadAlt className="text-gray-300 text-6xl"/>
                                            </p>
                                            <p className="text-lg font-semibold text-center">
                                                Upload Video
                                            </p>
                                            <p className="text-gray-400 text-center mt-10 text-sm leading-8">
                                                MP4 or WebM or Ogg <br/>
                                                720x1280 or higher <br/>
                                                Up to 10 Mins       <br/>
                                                Less than 2GB 
                                            </p>
                                            <p className="bg-[#F51997] text-center mt-10 rounded font-medium p-2 w-52 outline-none text-white">
                                                Select File
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                         type="file"
                                         name='upload-video'
                                         className="w-0 h-0"
                                         onChange={uploadVideo}
                                          />
                                </label>
                            )}
                        </div>
                    )}
                    {wrongFileType && (
                        <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[240px]">
                            Please Select a video file.
                        </p>
                    )}
                </div>
                
            </div> 
            <div className="flex flex-col gap-3 pb-10 p-4">
                <label  className="text-md font-medium">
                    Caption
                </label>
                <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="rounded outline-none text-md  border-2 border-gray-400"
                />
                <label className="text-md font-medium">
                    Choose a Category
                </label>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="outline-none border-2 border-gray-400 text-md capitalize lg:p-4 p-1 rounded cursor-pointer"
                >
                    { 
                        topics.map((topic) => (
                            <option 
                                key={topic.name}
                                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                            
                        ))
                    }
                </select>
                <div className="flex gap-6 mt-10">
                    <button
                        type="button"
                        className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none "
                    >
                        Discard
                    </button>
                    <button
                        type="button"
                        className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none "
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Upload