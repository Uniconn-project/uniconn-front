import React from 'react'
import Link from 'next/link'

export default function ProfileListItem({ profile, className = '' }) {
  return (
    <Link href={`/user/${profile.user.username}`}>
      <div
        className={`w-full flex flex-col items-start bg-transparent rounded-md shadow-lg p-2 my-3 cursor-pointer bg-hover sm:flex-row ${className}`}
      >
        <div className="flex">
          <img src={profile.photo} className="profile-img-md mr-2" />
          <div>
            <h5>
              {profile.first_name} {profile.last_name}
            </h5>
            <p className="self-start break-all color-secondary">
              @{profile.user.username}
            </p>
          </div>
        </div>
        <div className="w-full flex items-start ml-auto mr-4 mt-1 sm:w-auto sm:items-center">
          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {profile.bio}
          </span>
        </div>
      </div>
    </Link>
  )
}
