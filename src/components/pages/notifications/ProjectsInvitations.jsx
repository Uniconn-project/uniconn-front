import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/Auth'
import { NotificationsContext } from '../../../contexts/Notifications'
import Image from 'next/image'

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
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/reply-project-invitation`,
      {
        method: 'DELETE',
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
                <Link href={`/project/${project.id}?page=description`}>
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
      {projectsInvitations.map(request => (
        <div
          key={request.id}
          className="w-full flex color-headline bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <Link href={`/project/${request.project.id}?page=description`}>
            <div className="relative w-16 h-16 mr-2 ">
              <Image
                src={request.project.image}
                layout="fill"
                className="rounded-md object-cover cursor-pointer"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col mb-2 sm:flex-row sm:items-start">
              <Link href={`/user/${request.sender.user.username}`}>
                <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                  @{request.sender.user.username}
                </strong>
              </Link>
              <div style={{ maxWidth: '70%' }}>
                te convidou para entrar no projeto
                <Link href={`/project/${request.project.id}?page=description`}>
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
