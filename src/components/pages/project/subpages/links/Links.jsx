import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfoIcon from '@material-ui/icons/Info'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import AddLinkModal from './components/AddLinkModal'

export default function Links({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  const publicLinks = project.links.filter(link => link.is_public)
  const privateLinks = project.links.filter(link => !link.is_public)

  const isProjectMember = project.students
    .concat(project.mentors)
    .map(profile => profile.id)
    .includes(myProfile.id)

  return (
    <div className="p-2">
      <div className="sticky top-24 w-full mb-4 sm:top-32">
        <div className="w-full flex justify-between items-center bg-light h-14 rounded-md shadow-lg p-2">
          <span>Links do projeto</span>
          <InfoIcon className="self-start icon-sm cursor-pointer color-paragraph color-hover" />
        </div>
      </div>
      <div>
        {publicLinks.map(link => (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            key={link.id}
            className="no-underline"
          >
            <div className="flex p-4 bg-transparent rounded-md shadow-lg mb-4 color-paragraph bg-hover">
              <PublicIcon className="icon-sm mr-2" />
              <div>{link.name}</div>
            </div>
          </a>
        ))}
      </div>
      {isProjectMember && (
        <>
          <div>
            {privateLinks.map(link => (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.id}
                className="no-underline"
              >
                <div className="flex p-4 bg-transparent rounded-md shadow-lg mb-4 color-paragraph bg-hover">
                  <LockIcon className="icon-sm mr-2" />
                  <div>{link.name}</div>
                </div>
              </a>
            ))}
          </div>
          <AddLinkModal project={project} refetchProject={refetchProject} />
        </>
      )}
    </div>
  )
}
