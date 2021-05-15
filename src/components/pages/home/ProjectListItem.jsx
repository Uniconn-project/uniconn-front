import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

export default function ProjectListItem({ project }) {
  return (
    <div className="w-full mb-4 p-4 rounded-md shadow-lg cursor-pointer bg-transparent project-list-item">
      <div className="flex justify-between">
        <h4>{project.name}</h4>
        <div className="flex">
          {project.students.slice(0, 3).map(student => (
            <Tooltip
              key={student.id}
              title={student.user.username}
              className="bg-light"
              arrow
            >
              <img
                src={process.env.NEXT_PUBLIC_API_HOST + student.photo}
                className="profile-img-sm mx-0.5 cursor-pointer"
              />
            </Tooltip>
          ))}
        </div>
      </div>
      <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden mb-4">
        {project.slogan}
      </p>
      <img
        src={process.env.NEXT_PUBLIC_API_HOST + project.image}
        className="w-80 h-52 rounded-md object-cover"
      />
    </div>
  )
}
