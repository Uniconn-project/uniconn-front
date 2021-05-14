import React from 'react'
import { CircularProgress } from '@material-ui/core'
import ProjectListItem from './ProjectListItem'

function Projects({ renderedProjects }) {
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
