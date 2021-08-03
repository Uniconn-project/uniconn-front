import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/Auth'
import { NotificationsContext } from '../../../contexts/Notifications'

export default function ProjectsEntryRequests({
  projectsEntryRequests,
  fetchNotifications,
  setSuccessMsg,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)
  const { fetchNotificationsNumber } = useContext(NotificationsContext)

  const handleSubmit = async (reply, request) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/reply-project-entry-request`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify({
          reply,
          request_id: request.id
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        fetchNotifications()
        fetchNotificationsNumber()

        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          return
        }

        if (reply === 'accept') {
          setSuccessMsg({
            isOpen: true,
            message: (
              <span>
                <Link href={`/user/${request.profile.user.username}`}>
                  <strong className="cursor-pointer hover:underline">
                    @{request.profile.user.username}
                  </strong>
                </Link>{' '}
                entrou no projeto{' '}
                <Link href={`/project/${request.project.id}?page=description`}>
                  <strong className="cursor-pointer hover:underline">
                    {request.project.name}
                  </strong>
                </Link>
                !
              </span>
            )
          })
        }
      })
  }

  return (
    <div className="w-full">
      {projectsEntryRequests.map(request => (
        <div
          key={request.id}
          className="w-full flex color-headline bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <Link href={`/project/${request.project.id}?page=description`}>
            <img
              src={request.project.image}
              className="w-16 h-16 mr-2 rounded-md object-cover cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col mb-2 sm:flex-row sm:items-start">
              <Link href={`/user/${request.profile.user.username}`}>
                <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                  @{request.profile.user.username}
                </strong>
              </Link>
              <div style={{ maxWidth: '70%' }}>
                pediu para entrar no projeto
                <Link href={`/project/${request.project.id}`}>
                  <strong className="cursor-pointer mx-1 hover:underline">
                    {request.project.name}
                  </strong>
                </Link>
              </div>
            </div>
            <div className="w-full p-1 mb-2">
              <p className="color-paragraph break-all">{request.message}</p>
            </div>
            <div className="flex">
              <button
                className="rounded-lg bg-green bg-hover color-bg-light p-1 mr-1"
                onClick={() => handleSubmit('accept', request)}
              >
                Aceitar
              </button>
              <button
                className="rounded-lg bg-secondary bg-hover color-bg-light p-1 ml-1"
                onClick={() => handleSubmit('decline', request)}
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
