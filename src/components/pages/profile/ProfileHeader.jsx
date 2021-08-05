import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProfileHeader({ profile, page, setPage }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!profile || !myProfile) {
    return <CircularProgress />
  }

  return (
    <div className="sticky z-10 top-24 w-full mb-4 z-10 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg py-2 flex items-center">
        <div className="w-full flex">
          <div
            className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
              page === 'projects' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('projects')}
          >
            Projetos ({profile.projects.length})
          </div>
          <div
            className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
              page === 'links' || page === 'discussion'
                ? 'b-bottom-primary'
                : ''
            }`}
            onClick={() => setPage('links')}
          >
            Links ({profile.links.length})
          </div>
        </div>
      </div>
    </div>
  )
}
