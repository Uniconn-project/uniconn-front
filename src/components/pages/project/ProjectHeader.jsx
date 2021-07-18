import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProjectHeader({ project, page, setPage }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!project || !myProfile) {
    return <CircularProgress />
  }

  const isProjectMember = project.students
    .concat(project.mentors)
    .map(profile => profile.id)
    .includes(myProfile.id)

  return (
    <div className="sticky top-24 w-full mb-4 z-10 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <div className="flex px-4">
          <div
            className={`project-menu-item p-3 mr-2 nav-link cursor-pointer color-headline-hover ${
              page === 'description' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('description')}
          >
            Descrição
          </div>
          <div
            className={`project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover ${
              page === 'discussions' || page === 'discussion'
                ? 'b-bottom-primary'
                : ''
            }`}
            onClick={() => setPage('discussions')}
          >
            Discussões{' '}
            <span className="hidden sm:inline">
              ({project.discussions_length})
            </span>
          </div>
          <div
            className={`project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover ${
              page === 'links' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('links')}
          >
            Links{' '}
            <span className="hidden sm:inline">({project.links.length})</span>
          </div>
          {isProjectMember && (
            <div
              className={`project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover ${
                page === 'tools' ? 'b-bottom-primary' : ''
              }`}
              onClick={() => setPage('tools')}
            >
              Ferramentas{' '}
              <span className="hidden sm:inline">({project.tools.length})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
