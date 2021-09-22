import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import ProjectsInvitations from '../components/pages/notifications/ProjectsInvitations'
import ProjectsEntryRequests from '../components/pages/notifications/ProjectsEntryRequests'
import DiscussionsStars from '../components/pages/notifications/DiscussionsStars'
import { AuthContext } from '../contexts/Auth'
import { WebSocketsContext } from '../contexts/WebSockets'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'
import { NotificationsContext } from '../contexts/Notifications'
import DiscussionsReplies from '../components/pages/notifications/DiscussionsReplies'

export default function Notifications() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken, isAuthenticated } = useContext(AuthContext)
  const { socketEvent } = useContext(WebSocketsContext)
  const { fetchNotificationsNumber } = useContext(NotificationsContext)

  const [projectsInvitations, setProjectsInvitations] = useState(null)
  const [projectsEntryRequests, setProjectsEntryRequests] = useState(null)
  const [discussionsReplies, setDiscussionsReplies] = useState(null)
  const [discussionsStars, setDiscussionsStars] = useState(null)
  const [successMsg, setSuccessMsg] = useState({ isOpen: false, message: '' })
  const [errorMsg, setErrorMsg] = useState({ isOpen: false, message: '' })

  useEffect(() => {
    if (!isAuthenticated) return

    fetchNotifications()
    visualizeNotifications()
  }, [isAuthenticated]) // eslint-disable-line

  useEffect(() => {
    if (socketEvent.type === 'notification') {
      fetchNotifications()
    }
  }, [socketEvent]) // eslint-disable-line

  const fetchNotifications = async () => {
    const notifications = await fetcher('profiles/get-notifications', {
      Authorization: 'JWT ' + (await getToken())
    })

    setProjectsInvitations(notifications.projects_invitations)
    setProjectsEntryRequests(notifications.projects_entry_requests)
    setDiscussionsReplies(notifications.discussions_replies)
    setDiscussionsStars(notifications.discussions_stars)
  }

  const visualizeNotifications = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/visualize-notifications`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          fetchNotificationsNumber()
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
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
        <section className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 w-full mb-4 sm:top-32">
              <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
                <h3 className="color-paragraph">Notificações</h3>
              </div>
            </div>
            {projectsInvitations === null && (
              <div className="w-full flex justify-center">
                <CircularProgress size={30} />
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
            {projectsEntryRequests !== null && (
              <ProjectsEntryRequests
                projectsEntryRequests={projectsEntryRequests}
                fetchNotifications={fetchNotifications}
                setSuccessMsg={setSuccessMsg}
                setErrorMsg={setErrorMsg}
              />
            )}
            {discussionsReplies !== null && (
              <DiscussionsReplies replies={discussionsReplies} />
            )}
            {discussionsStars !== null && (
              <DiscussionsStars stars={discussionsStars} />
            )}
            {projectsInvitations &&
              projectsInvitations.length === 0 &&
              projectsEntryRequests &&
              projectsEntryRequests.length === 0 &&
              discussionsReplies &&
              discussionsReplies.length === 0 &&
              discussionsStars &&
              discussionsStars.length === 0 && (
                <div className="w-full p-5 pt-2 text-center sm:pt-5">
                  <span>Você não tem notificações.</span>
                </div>
              )}
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
        </section>
      </div>
    </Page>
  )
}
