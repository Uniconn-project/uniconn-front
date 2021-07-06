import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ReplyFrom from './components/ReplyFrom'
import StarsProfilesModal from './components/StarsProfilesModal'
import useFetch from '../../../../../hooks/useFetch'
import { mutate } from 'swr'
import { renderTimestamp } from '../../../../../utils/utils'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Discussion(props) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const { data: discussion } = useFetch(
    `projects/get-project-discussion/${props.discussion.id}`,
    {
      initialData: props.discussion
    }
  )
  const [starred, setStarred] = useState(
    discussion.stars.map(star => star.profile.id).includes(myProfile.id)
  )
  const [starCount, setStarCount] = useState(discussion.stars.length)
  const [starsModalIsOpen, setStarsModalIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  useEffect(() => {
    setStarCount(discussion.stars.length)
  }, [discussion])

  const starDiscussion = async () => {
    setStarCount(starCount + 1)
    setStarred(true)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/star-discussion/${discussion.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          mutate(`projects/get-project-discussion/${props.discussion.id}`)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount - 1)
          setStarred(false)
        }
      })
  }

  const unstarDiscussion = async () => {
    setStarCount(starCount - 1)
    setStarred(false)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/unstar-discussion/${discussion.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          mutate(`projects/get-project-discussion/${props.discussion.id}`)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount + 1)
          setStarred(true)
        }
      })
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
                onClick={unstarDiscussion}
              />
            ) : (
              <StarBorderIcon
                className="icon-sm mr-1 color-primary-hover"
                onClick={starDiscussion}
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
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}
