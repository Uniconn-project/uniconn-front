import React, { useContext, useEffect, useState } from 'react'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../contexts/MyProfile'
import { fetcher } from '../hooks/useFetch'
import Projects from '../components/global/Projects'

export default function MyProfile() {
  const { myProfile } = useContext(MyProfileContext)
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    if (!myProfile) return
    ;(async () => {
      const data = await fetcher(
        `profiles/get-profile-projects/${myProfile.user.username}`
      )
      await setProjects(data)
    })()
  }, [myProfile])

  return (
    <Page title="Perfil | Uniconn" page="profile" loginRequired header>
      <div className="w-full h-full flex flex-col justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 bg-light w-full h-14 rounded-md shadow-lg p-2 mb-4 flex justify-center items-center sm:top-32">
              {projects !== null ? (
                <span>Meus projetos ({projects.length})</span>
              ) : (
                <CircularProgress size={30} />
              )}
            </div>
            <div className="w-full px-2">
              <Projects projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
