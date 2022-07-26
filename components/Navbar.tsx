import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import  {useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils';
import userAuthStrore from '../store/auth'



const Navbar = () => {
  const {userProfile, addUser , removeUser } = userAuthStrore();

  return (
    <div className='w-full flex justify-between item-center border-b-2 border-gray-200 py-2
                    px-4'>
      <Link href="/">
          <div className='w-[100px] md:w-[130px]'>
            <Image 
              className="cursor-pointer"
              src={Logo}
              alt='Tik-Tik Logo'
              layout='responsive'
              />
          </div>
      </Link>
      <div>SEARCH</div>
      <div>
        { userProfile ? (
          <div className=" flex gap-5 md:gap-10 ">
            <Link href="/upload">
              <button className="border-2 px-2 flex items-center gap-2 md:px-4 text-md font-semibold ">
                <IoMdAdd className="text-xl"/> { " " }
                <span className="hidden md:block">upload</span>
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