import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import CircularProgress from '@material-ui/core/CircularProgress'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
import ProfileInfo from '../components/global/ProfileInfo'
import Page from '../components/Page'
import { AuthContext } from '../contexts/Auth'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'

export default function Notifications() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [projects, setProjects] = useState(null)

  useEffect(() => {
    const interval = setInterval(async () => {
      const notifications = await fetcher('profiles/get-notifications', {
        Authorization: 'JWT ' + (await getToken())
      })

      setProjects(notifications.projects)
    }, 5000)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line

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
          <div className="w-full flex justify-center" style={{ maxWidth: 600 }}>
            {projects !== null ? (
              <>
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="w-full flex bg-transparent rounded-md shadow-lg p-2"
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
                        <button className="rounded-lg bg-green bg-hover color-bg-light p-1 mr-1">
                          Aceitar
                        </button>
                        <button className="rounded-lg bg-secondary bg-hover color-bg-light p-1 ml-1">
                          Recusar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}
