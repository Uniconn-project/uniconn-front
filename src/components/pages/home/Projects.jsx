import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import useFetch from '../../../hooks/useFetch'
import ProjectListItem from './ProjectListItem'

function Projects() {
  const { data: projects } = useFetch('projects/get-project-list')

  const [renderedProjects, setRenderedProjects] = useState(null)

  useEffect(() => {
    setRenderedProjects(projects)
  }, [projects])

  if (!renderedProjects) {
    return <CircularProgress />
  }

  return (
    <div className="w-full h-full px-2">
      {renderedProjects.map(project => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Projects
