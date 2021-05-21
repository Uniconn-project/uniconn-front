import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import Tooltip from '@material-ui/core/Tooltip'
import TuneIcon from '@material-ui/icons/Tune'
import useFetch, { fetcher } from '../../../hooks/useFetch'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function ProjectsFilter({ projects, setRenderedProjects }) {
  const [search, setSearch] = useState('')
  const [filterHeight, setFilterHeight] = useState(0)

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  useEffect(() => {
    if (!projects || !setRenderedProjects) return

    setRenderedProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, projects, setRenderedProjects])

  const toggleAllFields = (checked, selector) => {
    document.querySelectorAll(selector).forEach(el => (el.checked = checked))
  }

  const handleFilterSubmit = async () => {
    const selectedCategories = []
    document
      .querySelectorAll('.category')
      .forEach(el => el.checked && selectedCategories.push(el.name))

    const selectedMarkets = []
    document
      .querySelectorAll('.market')
      .forEach(el => el.checked && selectedMarkets.push(el.name))

    const queryParams = `categories=${selectedCategories.join(
      ';'
    )}&markets=${selectedMarkets.join(';')}`

    const projects = await fetcher(
      `projects/get-filtered-projects-list?${queryParams}`
    )
    await setRenderedProjects(projects)
    setFilterHeight(0)
  }

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
        <div className="w-full bg-light shadow-lg rounded-md rounded-t-none">
          <div className="b-bottom-transparent p-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={e => toggleAllFields(e.target.checked, '.category')}
              />{' '}
              <h4 className="ml-1">Categorias</h4>
            </div>
            {categories ? (
              <ul>
                {categories.map(category => (
                  <li key={category}>
                    <input
                      type="checkbox"
                      className="category"
                      name={category}
                    />{' '}
                    {category[0].toUpperCase() + category.slice(1)}
                  </li>
                ))}
              </ul>
            ) : (
              <CircularProgress size={30} />
            )}
          </div>
          <div className="b-bottom-transparent p-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={e => toggleAllFields(e.target.checked, '.market')}
              />{' '}
              <h4 className="ml-1">Mercados</h4>
            </div>
            {markets ? (
              <ul>
                {markets.map(market => (
                  <li key={market.id}>
                    <input
                      type="checkbox"
                      className="market"
                      name={market.name}
                    />{' '}
                    {market.name[0].toUpperCase() + market.name.slice(1)}
                  </li>
                ))}
              </ul>
            ) : (
              <CircularProgress size={30} />
            )}
          </div>
          <div className="flex justify-end p-4">
            <button className="btn-primary" onClick={handleFilterSubmit}>
              Confirmar
            </button>
          </div>
        </div>
      </AnimateHeight>
    </div>
  )
}
