import React from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { renderTimestamp } from '../../../../../utils/utils'

export default function Discussion({ discussion }) {
  console.log(discussion)
  return (
    <div className="w-full p-2">
      <div className="bg-transparent rounded-md shadow-lg">
        <div className="flex justify-between p-2 b-bottom-light">
          <div className="flex flex-col sm:flex-row">
            <div className="mr-2">
              <Link href={`/user/${discussion.profile.user.username}`}>
                <Tooltip
                  title={discussion.profile.user.username}
                  className="bg-light"
                  arrow
                >
                  <img
                    src={discussion.profile.photo}
                    className="profile-img-sm mx-0.5 cursor-pointer"
                  />
                </Tooltip>
              </Link>
            </div>
            <div>
              <h5>
                {discussion.profile.first_name} {discussion.profile.last_name}
              </h5>
              <p className="self-start break-all color-secondary">
                @{discussion.profile.user.username}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-end items-end sm:flex-row sm:justify-start sm:items-center">
            <div className={`text-sm px-1 color-${discussion.category.value}`}>
              {discussion.category.readable}
            </div>
            <div className="ml-2">{renderTimestamp(discussion.created_at)}</div>
          </div>
        </div>
        <div className="w-full b-bottom-light">
          <div className="p-2">
            <h3>{discussion.title}</h3>
          </div>
          <div className="p-2">
            <p>{discussion.body}</p>
          </div>
        </div>
        <div>
          <div
            className="p-2 flex items-center color-primary-hover cursor-pointer"
            style={{ width: 'fit-content' }}
          >
            <StarBorderIcon className="icon-sm" /> 0
          </div>
        </div>
      </div>
    </div>
  )
}
