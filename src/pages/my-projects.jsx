import React, { useContext } from 'react'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../contexts/MyProfile'
import ProjectList from '../components/global/ProjectList'

export default function MyProjects() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page
        title="Meus projetos | Uniconn"
        page="my-projects"
        loginRequired
        header
      >
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page
      title="Meus projetos | Uniconn"
      page="my-projects"
      loginRequired
      header
    >
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
              <span>Meus projetos ({myProfile.projects.length})</span>
            </div>
            <div className="w-full px-2">
              {myProfile.type === 'student' && (
                <Link href="/create-project">
                  <div className="w-full flex items-center cursor-pointer bg-transparent bg-hover rounded-md shadow-lg p-2 mb-4">
                    <span>CRIAR PROJETO</span>
                    <AddIcon className="ml-auto" />
                  </div>
                </Link>
              )}
              <ProjectList projects={myProfile.projects} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
