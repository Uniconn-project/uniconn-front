import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/global/ProfileInfo'
import ProjectsFilter from '../components/pages/home/ProjectsFilter'
import useFetch from '../hooks/useFetch'
import { MyProfileContext } from '../contexts/MyProfile'

export default function Home() {
  const { myProfile } = useContext(MyProfileContext)

  const { data: projects } = useFetch('projects/get-project-list')

  const [renderedProjects, setRenderedProjects] = useState(null)

  useEffect(() => {
    setRenderedProjects(projects)
  }, [projects])

  return (
    <Page title="Home | Uniconn" page="home" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileMetrics profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectsFilter
              projects={projects}
              setRenderedProjects={setRenderedProjects}
            />
            <Projects renderedProjects={renderedProjects} />
          </div>
        </div>
      </div>
    </Page>
  )
}
