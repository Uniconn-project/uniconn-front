import React from 'react'
import Link from 'next/link'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'

export default function ProfileListItem({ profile }) {
  return (
    <Link href={`/user/${profile.user.username}`}>
      <div className="w-full flex flex-col items-start bg-transparent rounded-md shadow-lg p-2 my-3 cursor-pointer bg-hover sm:flex-row">
        <div className="flex">
          <div className="relative mr-2">
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + profile.photo}
              className={`profile-img-md img-${profile.type}`}
            />
            {profile.type === 'student' ? (
              <SchoolIcon className="icon" />
            ) : (
              <AssignmentIcon className="icon" />
            )}
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
        <div className="w-full flex items-start ml-auto mr-4 mt-1 sm:w-auto sm:items-center">
          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {profile.bio}
          </span>
        </div>
      </div>
    </Link>
  )
}
