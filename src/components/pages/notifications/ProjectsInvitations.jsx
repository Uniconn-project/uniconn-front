import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/Auth'
import { NotificationsContext } from '../../../contexts/Notifications'

export default function ProjectsInvitations({
  projectsInvitations,
  fetchNotifications,
  setSuccessMsg,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)
  const { fetchNotificationsNumber } = useContext(NotificationsContext)

  const handleSubmit = async (reply, project) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/reply-project-invitation`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify({
          reply,
          project_id: project.id
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
        }

        if (reply === 'accept') {
          setSuccessMsg({
            isOpen: true,
            message: (
              <span>
                Você entrou no projeto{' '}
                <Link href={`/project/${project.id}`}>
                  <strong className="cursor-pointer hover:underline">
                    {project.name}
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
      {console.log(projectsInvitations)}
      {projectsInvitations.map(request => (
        <div
          key={request.project.id}
          className="w-full flex bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <Link href={`/project/${request.project.id}`}>
            <img
              src={request.project.image}
              className="w-16 h-16 mr-2 rounded-md object-cover cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-between">
            <span className="color-headline">
              o projeto{' '}
              <Link href={`/project/${request.project.id}`}>
                <strong className="cursor-pointer hover:underline">
                  {request.project.name}
                </strong>
              </Link>{' '}
              convidou você
            </span>
            <div className="flex">
              <button
                className="rounded-lg bg-green bg-hover color-bg-light p-1 mr-1"
                onClick={() => handleSubmit('accept', request.project)}
              >
                Aceitar
              </button>
              <button
                className="rounded-lg bg-secondary bg-hover color-bg-light p-1 ml-1"
                onClick={() => handleSubmit('decline', request.project)}
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
