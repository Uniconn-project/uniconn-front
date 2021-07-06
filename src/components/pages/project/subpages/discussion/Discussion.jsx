import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import ReplyFrom from './components/ReplyFrom'
import StarsProfilesModal from './components/StarsProfilesModal'
import { renderTimestamp } from '../../../../../utils/utils'
import { MyProfileContext } from '../../../../../contexts/MyProfile'

export default function Discussion({ discussion }) {
  const { myProfile } = useContext(MyProfileContext)
  const [starred, setStarred] = useState(
    discussion.stars.map(star => star.profile.id).includes(myProfile.id)
  )
  const [starCount, setStarCount] = useState(discussion.stars.length)
  const [starsModalIsOpen, setStarsModalIsOpen] = useState(false)

  const star = () => {
    setStarCount(starCount + 1)
    setStarred(true)
  }

  const unstar = () => {
    setStarCount(starCount - 1)
    setStarred(false)
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
            className="p-2 flex items-center cursor-pointer"
            style={{ width: 'fit-content' }}
          >
            {starred ? (
              <StarIcon
                className="icon-sm mr-1 color-primary"
                onClick={unstar}
              />
            ) : (
              <StarBorderIcon
                className="icon-sm mr-1 color-primary-hover"
                onClick={star}
              />
            )}{' '}
            <span
              className="hover:underline"
              onClick={() => setStarsModalIsOpen(true)}
            >
              {starCount}
            </span>
          </div>
        </div>
      </div>
      <div className="pl-4">
        <ReplyFrom discussion={discussion} />
      </div>
      <StarsProfilesModal
        useIsOpen={() => [starsModalIsOpen, setStarsModalIsOpen]}
        profiles={discussion.stars.map(star => star.profile)}
      />
    </div>
  )
}
