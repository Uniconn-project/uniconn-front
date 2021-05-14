import React from 'react'

export default function Project({ project }) {
  return (
    <div className="w-full mb-4 p-4 rounded-md shadow-lg bg-transparent">
      <div>
        <h4>{project.name}</h4>
        <div>{}</div>
      </div>
      <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {project.slogan}
      </p>
    </div>
  )
}
