import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import CommentIcon from '@material-ui/icons/Comment'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ReplyFrom from './components/ReplyForm'
import StarsProfilesModal from '../../../../global/StarsProfilesModal'
import useFetch from '../../../../../hooks/useFetch'
import { mutate } from 'swr'
import { renderTimestamp } from '../../../../../utils/utils'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'
import ReplyListItem from './components/ReplyListItem'

export default function Discussion(props) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const { data: discussion } = useFetch(
    `projects/get-project-discussion/${props.discussion.id}`,
    {
      initialData: props.discussion
    }
  )
  const [starred, setStarred] = useState(false)
  const [starCount, setStarCount] = useState(discussion.stars.length)
  const [starsModalIsOpen, setStarsModalIsOpen] = useState(false)
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    message: ''
  })
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  useEffect(() => {
    if (!myProfile) return
    setStarred(
      discussion.stars.map(star => star.profile.id).includes(myProfile.id)
    )
  }, [myProfile])

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
                <img
                  src={discussion.profile.photo}
                  className="profile-img-sm mx-0.5 cursor-pointer"
                />
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
        <div className="flex items-center">
          <div
            className="p-2 mr-2 flex items-center cursor-pointer"
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
          <div>
            <CommentIcon className="icon-xs mr-1" /> {discussion.replies.length}
          </div>
        </div>
      </div>
      <div className="pl-4">
        <ReplyFrom discussion={discussion} setErrorMsg={setErrorMsg} />
        {discussion.replies.map(reply => (
          <ReplyListItem
            key={reply.id}
            discussion={discussion}
            reply={reply}
            setSuccessMsg={setSuccessMsg}
            setErrorMsg={setErrorMsg}
          />
        ))}
      </div>
      <StarsProfilesModal
        useIsOpen={() => [starsModalIsOpen, setStarsModalIsOpen]}
        profiles={discussion.stars.map(star => star.profile)}
      />
      <Snackbar
        open={successMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setSuccessMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="success">{successMsg.message}</Alert>
      </Snackbar>
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
