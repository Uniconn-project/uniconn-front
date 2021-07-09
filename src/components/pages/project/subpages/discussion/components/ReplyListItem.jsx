import React from 'react'
import Link from 'next/link'

export default function ReplyListItem({ reply }) {
  return (
    <div className="bg-transparent rounded-md shadow-lg mb-4">
      <div className="flex flex-col b-bottom-light p-2 sm:flex-row">
        <div className="mr-2">
          <Link href={`/user/${reply.profile.user.username}`}>
            <img
              src={reply.profile.photo}
              className="profile-img-sm mx-0.5 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <h5>
            {reply.profile.first_name} {reply.profile.last_name}
          </h5>
          <p className="self-start break-all color-secondary">
            @{reply.profile.user.username}
          </p>
        </div>
      </div>
      <div className="p-2">
        <p>{reply.content}</p>
      </div>
    </div>
  )
}
