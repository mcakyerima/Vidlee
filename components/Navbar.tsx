import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import  {useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/vidlee.png'
import { createOrGetUser } from '../utils';
import userAuthStrore from '../store/auth'



const Navbar = () => {
  const {userProfile, addUser , removeUser }: any = userAuthStrore();
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault()

  }

  // handle search of

  const handleSearch = (e: {preventDefault: () => void}) => {
    e.preventDefault()
    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className='w-full flex justify-between item-center border-b-2 border-gray-200 py-2
                    px-4' >
      <Link href="/">
          <div className='w-[100px] md:w-[130px] '>
            <Image 
              className="cursor-pointer"
              src={Logo}
              alt='Tik-Tik Logo'
              layout='responsive'
              />
          </div>
      </Link>
      <div className="relative hidden  md:block">
        <form
            className="absolute md:static top-10 left-20 bg-white" 
            onSubmit={handleSubmit}>
          <input 
              type="text"
              className="border-2 p-4 rounded-full bg-primary border-gray-100 px-4 py-4 h-10  focus:outline-none focus:border-2 focus:border-gray-300 shadow-sm font-medium md:text-md w-[300px] md:w-[320px] md:top-0"
              placeholder="Search accounts and videos"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute md:border-l-2 md:right-5 right-6 top-1.5 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch/>
          </button>
        </form>
      </div>
      <div>
        { userProfile ? (
          <div className=" flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 flex items-center gap-2 md:px-4 text-md font-semibold rounded-md hover:shadow-md">
                <IoMdAdd color="#f51997" className="text-xl"/> { " " }
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {
              userProfile.image && (
                <Link href='#'>
                            <>
                            <Image
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                                src={userProfile.image}
                                alt="profile image"
                            />
                            </>
                        </Link>
              )
            }
            <button type='button' className=" px-2">
              <AiOutlineLogout color="red"  font-size={25}
                onClick={() => {
                  googleLogout();
                  removeUser()}
                }
              />
            </button>
          </div>
        ): (
          <GoogleLogin 
            onSuccess={(response) => createOrGetUser(response , addUser)}
            onError={()=> console.log('error')}
            />
        )}
      </div>
    </div>
  )
}

export default Navbar