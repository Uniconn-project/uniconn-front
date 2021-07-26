import React from 'react'
import MembersDesktop from './components/MembersDesktop'
import MembersMobile from './components/MembersMobile'

const tailwindConfig = require('../../../../../../tailwind.config')

export default function Members({
  project,
  isProjectMember,
  isProjectAdmin,
  refetchProject
}) {
  const mobileBreakpoint = tailwindConfig.theme.screens.sm

  return (
    <>
      {visualViewport.width >
      Number(mobileBreakpoint.slice(0, mobileBreakpoint.length - 2)) ? (
        <MembersDesktop
          project={project}
          isProjectMember={isProjectMember}
          isProjectAdmin={isProjectAdmin}
          refetchProject={refetchProject}
        />
      ) : (
        <MembersMobile
          project={project}
          isProjectMember={isProjectMember}
          isProjectAdmin={isProjectAdmin}
          refetchProject={refetchProject}
        />
      )}
    </>
  )
}
