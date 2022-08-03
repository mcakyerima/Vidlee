import React, { useEffect } from 'react';
import  useAuthStrore  from '../store/auth';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { IUser } from '../types'

const SuggestedAccounts = () => {

  const { fetchAllUsers , allUsers } = useAuthStrore();
  useEffect(() => {
    fetchAllUsers();
  } , [fetchAllUsers]
  )

  return (
    <div className="xl:boder-b-2 border-grey-200  pb-4">
      <p className="text-grey-400 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>

      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image 
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt='User Profile'
                  layout='responsive'
                />
              </div>
              <div className="hidden xl:block ">
                  <p className="flex gap-2 items-center justify-center text-primary lowercase text-md font-bold">
                     { user.userName.replaceAll(" ", "")}
                     <GoVerified className="text-blue-400" />
                  </p>
                  <p className="capitalize text-gray-400 text-xs">
                    {user.userName}
                  </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts