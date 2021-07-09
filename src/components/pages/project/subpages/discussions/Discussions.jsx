import React, { useContext, useState } from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import StarIcon from '@material-ui/icons/Star'
import CommentIcon from '@material-ui/icons/Comment'
import useFetch from '../../../../../hooks/useFetch'
import CreateDiscussionForm from './components/CreateDiscussionForm'
import { renderTimestamp } from '../../../../../utils/utils'
import { AuthContext } from '../../../../../contexts/Auth'
import { MyProfileContext } from '../../../../../contexts/MyProfile'

export default function Discussions({
  project,
  refetchProject,
  openDiscussion
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const { data: discussions } = useFetch(
    `projects/get-project-discussions/${project.id}`
  )

  const isProjectMember = project.students
    .concat(project.mentors)
    .map(profile => profile.id)
    .includes(myProfile.id)

  const handleDelete = async (e, discussionId) => {
    e.stopPropagation()
    if (window.confirm('Deletar discussão?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/delete-project-discussion`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            discussion_id: discussionId
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('delete-discussion')
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
  }

  if (!discussions) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full p-2">
      {!isProjectMember && (
        <CreateDiscussionForm
          projectId={project.id}
          refetchProject={refetchProject}
          setErrorMsg={setErrorMsg}
        />
      )}
      <ul>
        {discussions.map(discussion => (
          <li
            key={discussion.id}
            className="bg-transparent rounded-md shadow-lg mb-4 bg-hover cursor-pointer"
            onClick={() => openDiscussion(discussion)}
          >
            <div className="px-2 pt-2 flex justify-between">
              <div>
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
              <div className="flex items-center">
                <div
                  className={`text-sm px-1 color-${discussion.category.value}`}
                >
                  {discussion.category.readable}
                </div>
                <div className="ml-2">
                  {renderTimestamp(discussion.created_at)}
                </div>
                {(isProjectMember ||
                  myProfile.id === discussion.profile.id) && (
                  <div
                    className="cursor-pointer p-2"
                    onClick={e => handleDelete(e, discussion.id)}
                  >
                    <DeleteIcon className="icon-sm color-secondary-hover" />
                  </div>
                )}
              </div>
            </div>
            <div className="px-2 pb-2 b-bottom-light">
              <strong>{discussion.title}</strong>
            </div>
            <div className="p-2 flex items-center">
              <div className="mr-2">
                <StarIcon className="icon-xs" /> {discussion.stars.length}
              </div>
              <div>
                <CommentIcon className="icon-xs" /> {discussion.replies.length}
              </div>
            </div>
          </li>
        ))}
      </ul>
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
