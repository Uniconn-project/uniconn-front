import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileInfo from '../components/global/ProfileInfo'
import ProjectsFilter from '../components/pages/home/ProjectsFilter'
import useFetch from '../hooks/useFetch'
import { MyProfileContext } from '../contexts/MyProfile'

export default function Home() {
  const { myProfile } = useContext(MyProfileContext)

  const { data: projects } = useFetch('projects/get-projects-list')

  const [renderedProjects, setRenderedProjects] = useState(null)

  useEffect(() => {
    if (renderedProjects !== null) return

    setRenderedProjects(projects)
  }, [projects]) // eslint-disable-line

  return (
    <Page title="Home | Uniconn" page="home" loginRequired header>
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
            <ProjectsFilter
              projects={projects}
              setRenderedProjects={setRenderedProjects}
            />
            {myProfile.type === 'student' && (
              <Link href="/project/create">
                <div className="w-full flex items-center cursor-pointer bg-transparent bg-hover rounded-md shadow-lg p-2 mb-4">
                  <span>CRIAR PROJETO</span>
                  <AddIcon className="ml-auto" />
                </div>
              </Link>
            )}
            <Projects renderedProjects={renderedProjects} />
          </div>
        </div>
      </div>
    </Page>
  )
}
