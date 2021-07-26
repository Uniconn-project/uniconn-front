import React from 'react'
import Link from 'next/link'

export default function ProfileListItemWithIcon({
  profile,
  children,
  className = ''
}) {
  return (
    <Link href={`/user/${profile.user.username}`}>
      <div className="py-1">
        <div
          className={`w-full flex items-start bg-transparent rounded-md shadow-lg p-2 cursor-pointer bg-hover ${className}`}
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
          <div className="flex items-start ml-auto mr-4 mt-1 sm:w-auto sm:items-center">
            {children}
          </div>
        </div>
      </div>
    </Link>
  )
}
