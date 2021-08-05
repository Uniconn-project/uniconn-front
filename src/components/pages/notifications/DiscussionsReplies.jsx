import React from 'react'
import Link from 'next/link'
import CommentIcon from '@material-ui/icons/Comment'
import { renderTimestamp } from '../../../utils/utils'
import Image from 'next/image'

export default function DiscussionsReplies({ replies }) {
  return (
    <div className="w-full">
      {replies.map(reply => (
        <Link
          key={reply.id}
          href={`/project/${reply.discussion.project_id}?page=description`}
        >
          <div className="w-full flex flex-col color-headline bg-transparent rounded-md shadow-lg p-2 mb-2 cursor-pointer bg-hover">
            <div className="flex flex-col justify-between sm:flex-row">
              <div className="flex flex-col mb-2 sm:flex-row sm:items-replyt">
                <Link href={`/user/${reply.profile.user.username}`}>
                  <div className="flex">
                    <CommentIcon className="color-paragraph self-center" />
                    <div className="profile-img-sm cursor-pointer">
                      <Image src={reply.profile.photo} layout="fill" />
                    </div>
                    <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                      @{reply.profile.user.username}
                    </strong>
                  </div>
                </Link>
                <div style={{ maxWidth: '70%' }}>respondeu sua discussão</div>
              </div>
              <div className="color-paragraph">
                {renderTimestamp(reply.created_at)}
              </div>
            </div>
            <div className="w-full p-1 mb-2">
              <p className="color-paragraph break-all">{reply.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
