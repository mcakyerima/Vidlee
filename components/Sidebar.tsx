import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillAndroid, AiFillCamera, AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';


const Sidebar = () => {
  const [ showSidbar , setShowSidebar ] = useState(true)

  // sidebar link dynamic styling
  const normalLink = " flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#dc09b9e0] rounded";
  // chekc if user is logged in then show some buttons 
  const userProfile = false

  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 mt-3 
            txt-xl'
            onClick = {() => setShowSidebar((previous) => !previous)} >
              { showSidbar ? <ImCancelCircle/> : <AiOutlineMenu/> }
      </div>
      {showSidbar && (
        <div className='xl:w-400 w-20 flex flex-col
              justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 
                border-gray-200 xl:pb-4'>
                <Link href='/'>
                  <div className={normalLink}>
                    <p className='text-2xl'>
                      <AiFillHome/>
                    </p>
                    <span className='text-xl hidden xl:block'>For You</span>
                  </div>
                </Link>
          </div>
            <Discover/>
            <SuggestedAccounts/>
            <Footer/>
          </div>
      )}
    </div>
  )
}

export default Sidebar