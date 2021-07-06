import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import FilledInput from '@material-ui/core/FilledInput'
import { renderTimestamp } from '../../../../../utils/utils'
import { MyProfileContext } from '../../../../../contexts/MyProfile'

export default function Discussion({ discussion }) {
  const { myProfile } = useContext(MyProfileContext)
  const [liked, setLiked] = useState(false)

  const handleSubmit = async () => {
    window.alert('Em desenvolvimento...')
  }

  return (
    <div className="w-full p-2">
      <div className="bg-transparent rounded-md shadow-lg mb-2">
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
            className="p-2 flex items-center cursor-pointer color-primary-hover-on-svg-child"
            style={{ width: 'fit-content' }}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <StarIcon className="icon-sm color-primary" />
            ) : (
              <StarBorderIcon className="icon-sm" />
            )}{' '}
            {liked ? '1' : '0'}
          </div>
        </div>
      </div>
      <div className="pl-4">
        <div className="bg-transparent rounded-md shadow-lg">
          <div className="flex justify-between p-2 mb-2 b-bottom-light">
            <div className="flex flex-col sm:flex-row">
              <div className="mr-2">
                <Link href="/profile">
                  <img
                    src={myProfile.photo}
                    className="profile-img-sm mx-0.5 cursor-pointer"
                  />
                </Link>
              </div>
              <div>
                <h5>
                  {myProfile.first_name} {myProfile.last_name}
                </h5>
                <p className="self-start break-all color-secondary">
                  @{myProfile.user.username}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start p-1">
            <FilledInput
              type="text"
              className="w-2/3"
              placeholder={`Responder ${discussion.profile.first_name}...`}
              inputProps={{ maxLength: 300 }}
              multiline
              style={{
                padding: '.5rem .5rem 1.25rem'
              }}
            />
            <button
              className="btn-primary btn-sm ml-auto"
              onClick={handleSubmit}
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
