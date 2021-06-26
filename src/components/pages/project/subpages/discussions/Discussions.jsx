import React from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import useFetch from '../../../../../hooks/useFetch'
import CreateDiscussionForm from './components/CreateDiscussionForm'

export default function Discussions({ project }) {
  const { data: discussions } = useFetch(
    `projects/get-project-comments/${project.id}`
  )

  const renderTimestamp = timestamp => {
    const ts = new Date(timestamp)
    const day = ts.getDate() >= 10 ? ts.getDate() : `0${ts.getDate()}`
    const month =
      ts.getMonth() + 1 >= 10 ? ts.getMonth() + 1 : `0${ts.getMonth() + 1}`
    const hour = ts.getHours() >= 10 ? ts.getHours() : `0${ts.getHours()}`
    const minute =
      ts.getMinutes() >= 10 ? ts.getMinutes() : `0${ts.getMinutes()}`
    return `${day}/${month}/${ts.getFullYear()} - ${hour}:${minute}`
  }

  if (!discussions) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="p-2">
      <CreateDiscussionForm />
      <ul>
        {discussions.map(discussion => (
          <li
            key={discussion.id}
            className="bg-transparent rounded-md shadow-lg p-2 mb-4 bg-hover cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <Link href={`/user/${discussion.profile.user.username}`}>
                  <Tooltip
                    title={discussion.profile.user.username}
                    className="bg-light"
                    arrow
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_HOST +
                        discussion.profile.photo
                      }
                      className="profile-img-sm mx-0.5 cursor-pointer"
                    />
                  </Tooltip>
                </Link>
              </div>
              <div className="flex items-center">
                <div
                  className={`text-sm px-1 color-${discussion.category.value}`}
                >
                  {discussion.category.readable}
                </div>
                <div className="ml-2">
                  {renderTimestamp(discussion.created_at)}
                </div>
              </div>
            </div>
            <div>
              <h5>{discussion.title}</h5>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
