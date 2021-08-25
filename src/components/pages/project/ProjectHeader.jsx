import React, { useContext } from 'react'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import DescriptionIcon from '@material-ui/icons/Description'
import ForumIcon from '@material-ui/icons/Forum'
import GroupIcon from '@material-ui/icons/Group'
import LinkIcon from '@material-ui/icons/Link'
import BuildIcon from '@material-ui/icons/Build'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProjectHeader({
  project,
  page,
  isProjectMember,
  setPage
}) {
  const { myProfile } = useContext(MyProfileContext)

  if (!project || !myProfile.id) {
    return <CircularProgress />
  }

  return (
    <nav className="sticky z-10 top-24 w-full mb-4 z-10 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg py-2 flex items-center">
        <div className="w-full flex">
          <Tooltip title="Descrição" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'description' ? 'b-bottom-primary' : ''
              }`}
              onClick={() =>
                Router.push(
                  `/project/${project.id}?page=description`,
                  undefined,
                  {
                    shallow: true
                  }
                )
              }
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
              onClick={() =>
                Router.push(
                  `/project/${project.id}?page=discussions`,
                  undefined,
                  {
                    shallow: true
                  }
                )
              }
            >
              <ForumIcon className="icon-sm" />{' '}
              <span>({project.discussions_length})</span>
            </div>
          </Tooltip>
          <Tooltip title="Participantes" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'members' ? 'b-bottom-primary' : ''
              }`}
              onClick={() =>
                Router.push(`/project/${project.id}?page=members`, undefined, {
                  shallow: true
                })
              }
            >
              <GroupIcon className="icon-sm" />{' '}
              <span>({project.members.length})</span>
            </div>
          </Tooltip>
          <Tooltip title="Links" placement="top" arrow>
            <div
              className={`project-menu-item p-3 nav-link cursor-pointer color-headline-hover flex justify-center items-center flex-grow ${
                page === 'links' ? 'b-bottom-primary' : ''
              }`}
              onClick={() =>
                Router.push(`/project/${project.id}?page=links`, undefined, {
                  shallow: true
                })
              }
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
                onClick={() =>
                  Router.push(`/project/${project.id}?page=tools`, undefined, {
                    shallow: true
                  })
                }
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
    </nav>
  )
}
