import React from 'react'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import StarIcon from '@material-ui/icons/Star'
import CommentIcon from '@material-ui/icons/Comment'

export default function ProjectListItem({ project }) {
  return (
    <Link href={`/project/${project.id}`}>
      <div className="w-full mb-4 rounded-md shadow-lg cursor-pointer bg-transparent bg-hover">
        <div className="flex justify-between px-4 pt-4">
          <div style={{ maxWidth: '60%' }}>
            <h4 className="break-words">{project.name}</h4>
          </div>
          <div className="flex items-center">
            {project.students.slice(0, 3).map(student => (
              <Link href={`/user/${student.user.username}`} key={student.id}>
                <Tooltip
                  title={student.user.username}
                  className="bg-light"
                  arrow
                >
                  <img
                    src={student.photo}
                    className="profile-img-sm mx-0.5 cursor-pointer"
                  />
                </Tooltip>
              </Link>
            ))}
          </div>
        </div>
        <div className="b-bottom-transparent px-4 pb-4">
          <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden mb-2">
            {project.slogan}
          </p>
          <img
            src={project.image}
            className="w-80 h-52 rounded-md object-cover mb-2"
          />
          <div className={`text-sm px-2 w-max color-${project.category.value}`}>
            {project.category.readable}
          </div>
        </div>
        <div className="p-2 flex items-center">
          <Tooltip title="Curtidas" placement="bottom" arrow>
            <div className="mr-2">
              <StarIcon className="icon-xs" /> {project.stars.length}
            </div>
          </Tooltip>
          <Tooltip title="Discussões" placement="bottom" arrow>
            <div>
              <CommentIcon className="icon-xs" /> {project.discussions_length}
            </div>
          </Tooltip>
        </div>
      </div>
    </Link>
  )
}
