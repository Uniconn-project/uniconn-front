import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/pages/home/ProfileMetrics'
import ProjectsFilter from '../components/pages/home/ProjectsFilter'
import useFetch from '../hooks/useFetch'

export default function Home() {
  const { data: projects } = useFetch('projects/get-project-list')

  const [renderedProjects, setRenderedProjects] = useState(null)

  useEffect(() => {
    setRenderedProjects(projects)
  }, [projects])

  return (
    <Page title="Home | Uniconn" page="home" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:flex-grow lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileMetrics />
            </div>
          </div>
        </div>
        <div
          className="flex justify-center lg:justify-start lg:box-border"
          style={{ flexGrow: 2 }}
        >
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
