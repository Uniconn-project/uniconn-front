import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProjectListItem from './ProjectListItem'

export default function ProjectList({ projects }) {
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
