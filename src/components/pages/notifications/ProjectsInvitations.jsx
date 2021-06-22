import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/Auth'

export default function ProjectsInvitations({
  projectsInvitations,
  fetchNotifications,
  setSuccessMsg,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)

  const handleSubmit = async (reply, project) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/reply-project-invitation`,
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
      {projectsInvitations.map(project => (
        <div
          key={project.id}
          className="w-full flex bg-transparent rounded-md shadow-lg p-2 mb-2"
        >
          <Link href={`/project/${project.id}`}>
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + project.image}
              className="w-16 h-16 mr-2 rounded-md object-cover cursor-pointer"
            />
          </Link>
          <div className="flex flex-col justify-between">
            <span className="color-headline">
              o projeto{' '}
              <Link href={`/project/${project.id}`}>
                <strong className="cursor-pointer hover:underline">
                  {project.name}
                </strong>
              </Link>{' '}
              convidou você
            </span>
            <div className="flex">
              <button
                className="rounded-lg bg-green bg-hover color-bg-light p-1 mr-1"
                onClick={() => handleSubmit('accept', project)}
              >
                Aceitar
              </button>
              <button
                className="rounded-lg bg-secondary bg-hover color-bg-light p-1 ml-1"
                onClick={() => handleSubmit('decline', project)}
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
