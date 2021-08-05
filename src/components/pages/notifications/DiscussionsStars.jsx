import React from 'react'
import Link from 'next/link'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { renderTimestamp } from '../../../utils/utils'
import Image from 'next/image'

export default function DiscussionsStars({ stars }) {
  return (
    <div className="w-full">
      {stars.map(star => (
        <Link
          key={star.id}
          href={`/project/${star.discussion.project_id}?page=description`}
        >
          <div className="w-full flex flex-col color-headline bg-transparent rounded-md shadow-lg p-2 mb-2 cursor-pointer bg-hover">
            <div className="flex flex-col justify-between sm:flex-row">
              <div className="flex flex-col mb-2 sm:flex-row sm:items-start">
                <Link href={`/user/${star.profile.user.username}`}>
                  <div className="flex">
                    <ThumbUpAltIcon className="color-paragraph self-center" />
                    <div className="profile-img-sm cursor-pointer">
                      <Image src={star.profile.photo} layout="fill" />
                    </div>
                    <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                      @{star.profile.user.username}
                    </strong>
                  </div>
                </Link>
                <div style={{ maxWidth: '70%' }}>curtiu sua discussão</div>
              </div>
              <div className="color-paragraph">
                {renderTimestamp(star.created_at)}
              </div>
            </div>
            <div className="w-full p-1 mb-2">
              <p className="color-paragraph break-all">
                {star.discussion.title}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
