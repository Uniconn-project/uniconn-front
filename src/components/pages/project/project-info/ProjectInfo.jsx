import React from 'react'
import ProjectInfoDesktop from './components/ProjectInfoDesktop'
import ProjectInfoMobile from './components/ProjectInfoMobile'

const tailwindConfig = require('../../../../../tailwind.config')

export default function ProjectInfo({
  project,
  isProjectAdmin,
  refetchProject
}) {
  const mobileBreakpoint = tailwindConfig.theme.screens.sm

  return (
    <>
      {visualViewport.width >
      Number(mobileBreakpoint.slice(0, mobileBreakpoint.length - 2)) ? (
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
      )}
    </>
  )
}
