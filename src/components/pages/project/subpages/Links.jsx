import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Links({ project }) {
  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }
  console.log(project)
  return (
    <div className="p-2">
      {project.links.map(link => (
        <a href={link.href} target="_blank" rel="noreferrer" key={link.id} className="no-underline">
          <div
            className="p-4 bg-transparent rounded-md shadow-lg mb-4 color-paragraph bg-hover"
          >
            <div className="no-underline">{link.name}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
