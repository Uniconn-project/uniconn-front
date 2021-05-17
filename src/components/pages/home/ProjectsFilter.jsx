import React, { useEffect, useState } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function ProjectsFilter({ projects, setRenderedProjects }) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!projects || !setRenderedProjects) return

    setRenderedProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, projects, setRenderedProjects])

  return (
    <div className="sticky top-24 bg-light w-full h-14 rounded-md shadow-lg p-2 mb-4 flex items-center sm:top-32">
      <input
        type="text"
        placeholder="Pesquisar projeto..."
        className="bg-transparent p-2"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <FilterListIcon className="ml-auto cursor-pointer color-primary color-hover" />
    </div>
  )
}
