import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProjectListItem from './ProjectListItem'

function Projects({ projects }) {
  if (!projects) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress />
      </div>
    )
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
