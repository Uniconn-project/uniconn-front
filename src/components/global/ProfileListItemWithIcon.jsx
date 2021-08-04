import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfileListItemWithIcon({
  profile,
  children,
  role = null,
  className = ''
}) {
  return (
    <Link href={`/user/${profile.user.username}`}>
      <div className="py-1">
        <div
          className={`w-full flex items-start bg-transparent rounded-md shadow-lg p-2 cursor-pointer bg-hover ${className}`}
        >
          <div className="flex">
            <Image
              width="4rem"
              height="4rem"
              src={profile.photo}
              className="profile-img-md mr-2"
            />
            <div>
              <div className="flex">
                <h5>
                  {profile.first_name} {profile.last_name}
                </h5>
                {role !== null && <span className="ml-2 text-sm">{role}</span>}
              </div>
              <p className="self-start break-all color-secondary">
                @{profile.user.username}
              </p>
            </div>
          </div>
          <div className="flex items-start ml-auto mr-4 mt-1 sm:w-auto sm:items-center">
            {children}
          </div>
        </div>
      </div>
    </Link>
  )
}
