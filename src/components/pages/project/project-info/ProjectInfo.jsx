import React from 'react'
import ProjectInfoDesktop from './components/ProjectInfoDesktop'
import ProjectInfoMobile from './components/ProjectInfoMobile'

const tailwindConfig = require('../../../../../tailwind.config')

export default function ProjectInfo({ project, setPage, refetchProject }) {
  const mobileBreakpoint = tailwindConfig.theme.screens.sm

  return (
    <>
      {visualViewport.width >
      Number(mobileBreakpoint.slice(0, mobileBreakpoint.length - 2)) ? (
        <ProjectInfoDesktop
          project={project}
          setPage={setPage}
          refetchProject={refetchProject}
        />
      ) : (
        <ProjectInfoMobile
          project={project}
          setPage={setPage}
          refetchProject={refetchProject}
        />
      )}
    </>
  )
}
