import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import DescriptionIcon from '@material-ui/icons/Description'
import ForumIcon from '@material-ui/icons/Forum'
import GroupIcon from '@material-ui/icons/Group'
import LinkIcon from '@material-ui/icons/Link'
import BuildIcon from '@material-ui/icons/Build'
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
      <div className="w-full bg-light h-14 rounded-md shadow-lg py-2 flex items-center">
        <div className="w-full flex">
          <Tooltip title="Descrição" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'description' ? 'b-bottom-primary' : ''
              }`}
              onClick={() => setPage('description')}
            >
              <DescriptionIcon className="icon-sm" />
            </div>
          </Tooltip>
          <Tooltip title="Discussões" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'discussions' || page === 'discussion'
                  ? 'b-bottom-primary'
                  : ''
              }`}
              onClick={() => setPage('discussions')}
            >
              <ForumIcon className="icon-sm" />{' '}
              <span>({project.discussions_length})</span>
            </div>
          </Tooltip>
          <Tooltip title="Equipe" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'members' ? 'b-bottom-primary' : ''
              }`}
              onClick={() => setPage('members')}
            >
              <GroupIcon className="icon-sm" />{' '}
              <span>({project.students.concat(project.mentors).length})</span>
            </div>
          </Tooltip>
          <Tooltip title="Links" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'links' ? 'b-bottom-primary' : ''
              }`}
              onClick={() => setPage('links')}
            >
              <LinkIcon className="icon-sm" />{' '}
              <span>({project.links.length})</span>
            </div>
          </Tooltip>
          {isProjectMember && (
            <Tooltip title="Ferramentas" placement="top" arrow>
              <div
                className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                  page === 'tools' ? 'b-bottom-primary' : ''
                }`}
                onClick={() => setPage('tools')}
              >
                <BuildIcon className="icon-sm" />{' '}
                <span>
                  (
                  {project.tools_categories
                    .map(category => category.tools.length)
                    .reduce((prev, curr) => prev + curr, 0)}
                  )
                </span>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
