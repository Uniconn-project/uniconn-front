import React from 'react'
import MembersDesktop from './components/MembersDesktop'
import MembersMobile from './components/MembersMobile'

const tailwindConfig = require('../../../../../../tailwind.config')

export default function ProjectInfo({ project, setPage, refetchProject }) {
  const mobileBreakpoint = tailwindConfig.theme.screens.sm

  return (
    <>
      {visualViewport.width >
      Number(mobileBreakpoint.slice(0, mobileBreakpoint.length - 2)) ? (
        <MembersDesktop project={project} refetchProject={refetchProject} />
      ) : (
        <MembersMobile project={project} refetchProject={refetchProject} />
      )}
    </>
  )
}
