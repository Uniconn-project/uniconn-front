import React, { useContext } from 'react'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import ProjectList from '../../../../components/global/ProjectList'
import { MyProfileContext } from '../../../../contexts/MyProfile'

export default function Projects({ profile }) {
  const { myProfile } = useContext(MyProfileContext)

  return (
    <>
      {profile.id === myProfile.id && (
        <Link href="/create-project">
          <div className="w-full flex items-center cursor-pointer bg-transparent bg-hover color-primary rounded-md shadow-lg p-2 mb-4">
            <AddIcon className="mr-2" />
            <strong>Criar Projeto</strong>
          </div>
        </Link>
      )}
      <ProjectList projects={profile.projects} />
    </>
  )
}
