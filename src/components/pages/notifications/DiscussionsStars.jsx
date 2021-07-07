import React from 'react'
import Link from 'next/link'
import StarIcon from '@material-ui/icons/Star'

export default function DiscussionsStars({ stars }) {
  return (
    <div className="w-full">
      {stars.map(star => (
        <div
          key={star.id}
          className="w-full flex flex-col color-headline bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <div className="flex flex-col mb-2 sm:flex-row sm:items-start">
            <Link href={`/user/${star.profile.user.username}`}>
              <div className="flex">
                <StarIcon className="color-paragraph self-center" />
                <img
                  src={star.profile.photo}
                  className="profile-img-sm cursor-pointer"
                />
                <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                  @{star.profile.user.username}
                </strong>
              </div>
            </Link>
            <div style={{ maxWidth: '70%' }}>curtiu sua discussão</div>
          </div>
          <div className="w-full p-1 mb-2">
            <p className="color-paragraph break-all">{star.discussion.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
