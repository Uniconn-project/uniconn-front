import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import Tooltip from '@material-ui/core/Tooltip'
import TuneIcon from '@material-ui/icons/Tune'

export default function ProjectsFilter({ projects, setRenderedProjects }) {
  const [search, setSearch] = useState('')
  const [filterHeight, setFilterHeight] = useState(0)

  useEffect(() => {
    if (!projects || !setRenderedProjects) return

    setRenderedProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, projects, setRenderedProjects])

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <input
          type="text"
          placeholder="Pesquisar projeto..."
          className="bg-transparent p-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Tooltip title="Filtrar projetos" placement="top" arrow>
          <TuneIcon
            className="ml-auto cursor-pointer color-primary color-hover"
            onClick={() =>
              setFilterHeight(filterHeight === 'auto' ? 0 : 'auto')
            }
          />
        </Tooltip>
      </div>
      <AnimateHeight height={filterHeight}>
        <div className="w-full bg-light shadow-lg rounded-md">
          <div className="b-bottom-transparent p-2">
            <h4>Categoria</h4>
            <ul>
              <li>
                <input type="checkbox" /> Startup
              </li>
              <li>
                <input type="checkbox" /> Empresa júnior
              </li>
              <li>
                <input type="checkbox" /> Projeto social
              </li>
              <li>
                <input type="checkbox" /> Projeto acadêmico
              </li>
            </ul>
          </div>
          <div className="b-bottom-transparent p-2">
            <h4>Mercados</h4>
            <ul>
              <li>
                <input type="checkbox" /> Tech
              </li>
              <li>
                <input type="checkbox" /> Saúde
              </li>
              <li>
                <input type="checkbox" /> Esportes
              </li>
            </ul>
          </div>
        </div>
      </AnimateHeight>
    </div>
  )
}
