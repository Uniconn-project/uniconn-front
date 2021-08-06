import React from 'react'
import ProjectList from '../../../../components/global/ProjectList'

export default function Projects({ profile }) {
  return <ProjectList projects={profile.projects} />
}
