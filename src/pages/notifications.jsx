import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileInfo from '../components/global/ProfileInfo'
import Page from '../components/Page'
import { AuthContext } from '../contexts/Auth'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'

export default function Notifications() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [projects, setProjects] = useState(null)
  const [successMsg, setSuccessMsg] = useState({ isOpen: false, value: '' })

  useEffect(() => {
    fetchNotifications()

    const interval = setInterval(fetchNotifications, 10000)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  const fetchNotifications = async () => {
    const notifications = await fetcher('profiles/get-notifications', {
      Authorization: 'JWT ' + (await getToken())
    })

    setProjects(notifications.projects)
  }

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
        if (data === 'Replied to project with success' && reply === 'accept') {
          setSuccessMsg({
            isOpen: true,
            value: `Você entrou no projeto ${project.name}!`
          })
        }
      })
  }

  return (
    <Page
      title="Notificações | Uniconn"
      page="notifications"
      loginRequired
      header
    >
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 w-full mb-4 sm:top-32">
              <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
                Notificações
              </div>
            </div>
            {projects !== null ? (
              <div className="w-full">
                {projects.map(project => (
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
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
        <Snackbar
          open={successMsg.isOpen}
          autoHideDuration={6000}
          onClose={() => setSuccessMsg({ isOpen: false, value: '' })}
        >
          <Alert severity="success">{successMsg.value}</Alert>
        </Snackbar>
      </div>
    </Page>
  )
}
