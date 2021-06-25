import React from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import useFetch from '../../../../hooks/useFetch'

export default function Discussions({ project }) {
  const { data: comments } = useFetch(
    `projects/get-project-comments/${project.id}`
  )

  if (!comments) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="p-2">
      <ul>
        {comments.map(comment => (
          <li
            key={comment.id}
            className="flex bg-transparent rounded-md shadow-lg p-2 mb-4 bg-hover cursor-pointer"
          >
            <div className="flex">
              <div>
                <Link href={`/user/${comment.profile.user.username}`}>
                  <Tooltip
                    title={comment.profile.user.username}
                    className="bg-light"
                    arrow
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_HOST + comment.profile.photo
                      }
                      className="profile-img-sm mx-0.5 cursor-pointer"
                    />
                  </Tooltip>
                </Link>
              </div>
              <div></div>
              <div></div>
            </div>
            <div>
              <h5>{comment.title}</h5>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
