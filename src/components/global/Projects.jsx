import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProjectListItem from './ProjectListItem'

function Projects({ projects }) {
  if (!projects) {
    return <CircularProgress />
  }

  return (
    <>
      {projects.map(project => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </>
  )
}

export default Projects
