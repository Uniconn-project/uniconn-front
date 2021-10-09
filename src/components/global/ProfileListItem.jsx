import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfileListItem({
  profile,
  className = null,
  onClick = () => {}
}) {
  return (
    <Link href={`/user/${profile.user.username}`}>
      <div
        className={`w-full flex flex-col items-start p-2 cursor-pointer ${
          className || 'bg-transparent bg-hover rounded-md shadow-lg my-3'
        }`}
        onClick={onClick}
      >
        <div className="flex">
          <div className="profile-img-md mr-2">
            <Image src={profile.photo} layout="fill" />
          </div>
          <div>
            <h5>
              {profile.first_name} {profile.last_name}
            </h5>
            <p className="self-start break-all color-secondary">
              @{profile.user.username}
            </p>
          </div>
        </div>
        <div className="w-full flex items-start ml-auto mr-4 mt-1">
          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {profile.bio}
          </span>
        </div>
      </div>
    </Link>
  )
}
