import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'
import ProfileHeader from '../components/pages/profile/ProfileHeader'
import Projects from '../components/pages/profile/subpages/Projects'
import Links from '../components/pages/profile/subpages/Links'

export default function Profile() {
  const { myProfile, refetchMyProfile } = useContext(MyProfileContext)
  const [page, setPage] = useState('projects')
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    value: ''
  })

  const refetchProfile = async action => {
    refetchMyProfile()

    switch (action) {
      case 'add-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link adicionado!'
        })
        break

      case 'delete-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link removido!'
        })
        break
    }
  }

  if (!myProfile.id) {
    return (
      <Page title="Perfil | Uniconn" page="profile" loginRequired header>
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page title="Perfil | Uniconn" page="profile" loginRequired header>
      <div className="w-full h-full flex flex-col justify-center lg:flex-row">
        <section className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProfileHeader profile={myProfile} page={page} setPage={setPage} />
            <div className="w-full px-2">
              {page === 'projects' && <Projects profile={myProfile} />}
              {page === 'links' && (
                <Links profile={myProfile} refetchProfile={refetchProfile} />
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
        </section>
      </div>
    </Page>
  )
}
