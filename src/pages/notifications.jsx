import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import { AuthContext } from '../contexts/Auth'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'
import ProjectsInvitations from '../components/pages/notifications/ProjectsInvitations'
import ProjectsEnteringRequests from '../components/pages/notifications/ProjectsEnteringRequests'

export default function Notifications() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [projectsInvitations, setProjectsInvitations] = useState(null)
  const [projectsEnteringRequests, setProjectsEnteringRequests] = useState(null)
  const [successMsg, setSuccessMsg] = useState({ isOpen: false, message: '' })
  const [errorMsg, setErrorMsg] = useState({ isOpen: false, message: '' })

  useEffect(() => {
    fetchNotifications()

    const interval = setInterval(fetchNotifications, 10000)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  const fetchNotifications = async () => {
    const notifications = await fetcher('profiles/get-notifications', {
      Authorization: 'JWT ' + (await getToken())
    })

    setProjectsInvitations(notifications.projects_invitations)
    setProjectsEnteringRequests(notifications.projects_entering_requests)
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
            {projectsInvitations === null && projectsEnteringRequests === null && (
              <div className="w-full flex justify-center">
                <CircularProgress />
              </div>
            )}
            {projectsInvitations !== null && (
              <ProjectsInvitations
                projectsInvitations={projectsInvitations}
                fetchNotifications={fetchNotifications}
                setSuccessMsg={setSuccessMsg}
                setErrorMsg={setErrorMsg}
              />
            )}
            {projectsEnteringRequests !== null && (
              <ProjectsEnteringRequests
                projectsEnteringRequests={projectsEnteringRequests}
                fetchNotifications={fetchNotifications}
                setSuccessMsg={setSuccessMsg}
                setErrorMsg={setErrorMsg}
              />
            )}
          </div>
        </div>
        <Snackbar
          open={successMsg.isOpen}
          autoHideDuration={6000}
          onClose={() => setSuccessMsg({ isOpen: false, message: '' })}
        >
          <Alert severity="success">{successMsg.message}</Alert>
        </Snackbar>
        <Snackbar
          open={errorMsg.isOpen}
          autoHideDuration={6000}
          onClose={() => setErrorMsg({ isOpen: false, message: '' })}
        >
          <Alert severity="error">{errorMsg.message}</Alert>
        </Snackbar>
      </div>
    </Page>
  )
}
