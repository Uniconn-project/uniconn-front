import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/Auth'

export default function ProjectsEnteringRequests({
  projectsEnteringRequests,
  fetchNotifications,
  setSuccessMsg,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)

  const handleSubmit = async (reply, enteringRequest) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/reply-project-entering-request`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify({
          reply,
          project_entering_request_id: enteringRequest.id
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        fetchNotifications()

        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }

        if (reply === 'accept') {
          console.log(data)
          setSuccessMsg({
            isOpen: true,
            message: (
              <span>
                <Link href={`/user/${enteringRequest.profile.user.username}`}>
                  <strong className="cursor-pointer hover:underline">
                    @{enteringRequest.profile.user.username}
                  </strong>
                </Link>{' '}
                entrou no projeto{' '}
                <Link href={`/project/${enteringRequest.project.id}`}>
                  <strong className="cursor-pointer hover:underline">
                    {enteringRequest.project.name}
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
      {projectsEnteringRequests.map(enteringRequest => (
        <div
          key={enteringRequest.id}
          className="w-full flex color-headline bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <Link href={`/project/${enteringRequest.project.id}`}>
            <img
              src={
                process.env.NEXT_PUBLIC_API_HOST + enteringRequest.project.image
              }
              className="w-16 h-16 mr-2 rounded-md object-cover cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col mb-2 sm:flex-row">
              <Link href={`/user/${enteringRequest.profile.user.username}`}>
                <div className="flex">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_API_HOST +
                      enteringRequest.profile.photo
                    }
                    className="profile-img-sm cursor-pointer"
                  />
                  <strong className="color-secondary cursor-pointer mx-1 hover:underline">
                    @{enteringRequest.profile.user.username}
                  </strong>
                </div>
              </Link>
              <div>
                pediu para entrar no projeto
                <Link href={`/project/${enteringRequest.project.id}`}>
                  <strong className="cursor-pointer mx-1 hover:underline">
                    {enteringRequest.project.name}
                  </strong>
                </Link>
              </div>
            </div>
            <div className="w-full p-1 mb-2">
              <p className="color-paragraph break-all">
                {enteringRequest.message}
              </p>
            </div>
            <div className="flex">
              <button
                className="rounded-lg bg-green bg-hover color-bg-light p-1 mr-1"
                onClick={() => handleSubmit('accept', enteringRequest)}
              >
                Aceitar
              </button>
              <button
                className="rounded-lg bg-secondary bg-hover color-bg-light p-1 ml-1"
                onClick={() => handleSubmit('decline', enteringRequest)}
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
