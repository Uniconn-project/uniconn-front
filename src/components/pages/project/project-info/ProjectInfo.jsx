import React from 'react'
import ProjectInfoDesktop from './components/ProjectInfoDesktop'
import ProjectInfoMobile from './components/ProjectInfoMobile'

const tailwindConfig = require('../../../../../tailwind.config')

export default function ProjectInfo({
  project,
  isProjectAdmin,
  refetchProject
}) {
  const mobileBreakpoint = Number(
    tailwindConfig.theme.screens.sm.slice(
      0,
      tailwindConfig.theme.screens.sm.length - 2
    )
  )

  return visualViewport.width > mobileBreakpoint ? (
    <ProjectInfoDesktop
      project={project}
      isProjectAdmin={isProjectAdmin}
      refetchProject={refetchProject}
    />
  ) : (
    <ProjectInfoMobile
      project={project}
      isProjectAdmin={isProjectAdmin}
      refetchProject={refetchProject}
    />
  )
}
