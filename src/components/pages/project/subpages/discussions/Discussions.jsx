import React, { useContext, useState } from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import useFetch from '../../../../../hooks/useFetch'
import CreateDiscussionForm from './components/CreateDiscussionForm'
import { AuthContext } from '../../../../../contexts/Auth'
import { MyProfileContext } from '../../../../../contexts/MyProfile'

export default function Discussions({ project, refetchProject }) {
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

  const handleDelete = async discussionId => {
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
    <div className="p-2">
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
                {(isProjectMember ||
                  myProfile.id === discussion.profile.id) && (
                  <div
                    className="cursor-pointer p-2"
                    onClick={() => handleDelete(discussion.id)}
                  >
                    <DeleteIcon className="icon-sm color-secondary-hover" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <strong>{discussion.title}</strong>
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
