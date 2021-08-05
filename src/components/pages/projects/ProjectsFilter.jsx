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
  const { data: fields } = useFetch('projects/get-fields-name-list')

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
    const categoryCheckboxes = Array.from(
      document.querySelectorAll('.category')
    )
    for (let i in categoryCheckboxes) {
      i = Number(i)
      if (categoryCheckboxes[i].checked) break
      else if (
        i === categoryCheckboxes.length - 1 &&
        !categoryCheckboxes[i].checked
      ) {
        window.alert('Selecione pelo menos uma categoria!')
        return
      }
    }

    const fieldCheckboxes = Array.from(document.querySelectorAll('.field'))
    for (let i in fieldCheckboxes) {
      i = Number(i)
      if (fieldCheckboxes[i].checked) break
      else if (
        i === fieldCheckboxes.length - 1 &&
        !fieldCheckboxes[i].checked
      ) {
        window.alert('Selecione pelo menos uma mercado!')
        return
      }
    }

    const selectedCategories = []
    document
      .querySelectorAll('.category')
      .forEach(el => el.checked && selectedCategories.push(el.name))

    const selectedFields = []
    document
      .querySelectorAll('.field')
      .forEach(el => el.checked && selectedFields.push(el.name))

    const queryParams = `categories=${selectedCategories.join(
      ';'
    )}&fields=${selectedFields.join(';')}`

    const projects = await fetcher(
      `projects/get-filtered-projects-list?${queryParams}`
    )
    await setRenderedProjects(projects)
    setFilterHeight(0)
  }

  return (
    <div className="sticky z-10 top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light m-h-14 rounded-md shadow-lg p-2 flex flex-col">
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Pesquisar projeto..."
            className="w-9/12 bg-transparent p-2"
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
          <div className="w-full">
            <div className="b-bottom-transparent p-2">
              <div className="flex items-center">
                <h4>Categorias</h4>
              </div>
              {categories ? (
                <ul className="max-h-36 overflow-y-auto">
                  <li>
                    <input
                      type="checkbox"
                      onChange={e =>
                        toggleAllFields(e.target.checked, '.category')
                      }
                    />{' '}
                    Todos
                  </li>
                  {categories.map(category => (
                    <li key={category.value}>
                      <input
                        type="checkbox"
                        className="category"
                        name={category.value}
                      />{' '}
                      {category.readable[0].toUpperCase() +
                        category.readable.slice(1)}
                    </li>
                  ))}
                </ul>
              ) : (
                <CircularProgress size={30} />
              )}
            </div>
            <div className="b-bottom-transparent p-2">
              <div className="flex items-center">
                <h4>Áreas de atuação</h4>
              </div>
              {fields ? (
                <ul className="max-h-36 overflow-y-auto">
                  <li>
                    <input
                      type="checkbox"
                      onChange={e =>
                        toggleAllFields(e.target.checked, '.field')
                      }
                    />{' '}
                    Todos
                  </li>
                  {fields.map(field => (
                    <li key={field.id}>
                      <input
                        type="checkbox"
                        className="field"
                        name={field.name}
                      />{' '}
                      {field.name[0].toUpperCase() + field.name.slice(1)}
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
    </div>
  )
}
