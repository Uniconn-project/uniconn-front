import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Link from 'next/link'

export default function ProjectListItem({ project }) {
  return (
    <Link href={`/project/${project.id}`}>
      <div className="w-full mb-4 p-4 rounded-md shadow-lg cursor-pointer bg-transparent bg-hover">
        <div className="flex justify-between">
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
                    src={process.env.NEXT_PUBLIC_API_HOST + student.photo}
                    className="profile-img-sm mx-0.5 cursor-pointer"
                  />
                </Tooltip>
              </Link>
            ))}
          </div>
        </div>
        <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden mb-2">
          {project.slogan}
        </p>
        <p className={`mb-4 font-bold color-${project.category.value}`}>
          {project.category.readable}
        </p>
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + project.image}
          className="w-80 h-52 rounded-md object-cover"
        />
      </div>
    </Link>
  )
}
