import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import TuneIcon from '@material-ui/icons/Tune'
import CircularProgress from '@material-ui/core/CircularProgress'
import useFetch, { fetcher } from '../../../hooks/useFetch'
import { formattedQueryString } from '../../../utils/utils'

export default function ProjectsFilter({
  baseProjects,
  setRenderedProjects,
  setQueryParams
}) {
  const [search, setSearch] = useState('')
  const [filterHeight, setFilterHeight] = useState(0)
  const [categoriesCheckedState, setCategoriesCheckedState] = useState(null)
  const [fieldsCheckedState, setFieldsCheckedState] = useState(null)

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: fields } = useFetch('projects/get-fields-name-list')

  useEffect(() => {
    if (!search.trim().length) {
      setRenderedProjects(baseProjects)
      return
    }

    ;(async () => {
      const data = await fetcher(`projects/get-filtered-projects/${search}`)
      setRenderedProjects(data)
    })()
  }, [search]) // eslint-disable-line

  useEffect(() => {
    if (!categories || categoriesCheckedState) return

    resetCategoriesCheckboxes(true)
  }, [categories]) // eslint-disable-line

  useEffect(() => {
    if (!fields || fieldsCheckedState) return

    resetFieldsCheckboxes(true)
  }, [fields]) // eslint-disable-line

  const resetCategoriesCheckboxes = checked => {
    const checkedState = {}

    for (const category of categories) {
      checkedState[category.value] = checked
    }

    setCategoriesCheckedState(checkedState)
  }

  const resetFieldsCheckboxes = checked => {
    const checkedState = {}

    for (const field of fields) {
      checkedState[field.name] = checked
    }

    setFieldsCheckedState(checkedState)
  }

  const handleFilterSubmit = async () => {
    const selectedCategories = Object.keys(categoriesCheckedState).filter(
      key => categoriesCheckedState[key]
    )

    const selectedFields = Object.keys(fieldsCheckedState).filter(
      key => fieldsCheckedState[key]
    )

    const queryParams = `&categories=${selectedCategories.join(
      ';'
    )}&fields=${selectedFields.join(';')}`

    setQueryParams(formattedQueryString(queryParams))
    setFilterHeight(0)
  }

  if (!categoriesCheckedState || !fieldsCheckedState) {
    return <CircularProgress size={30} />
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
              <ul className="max-h-36 overflow-y-auto">
                <li className="flex items-center">
                  <Checkbox
                    className="p-0 color-primary"
                    checked={
                      !Object.values(categoriesCheckedState).includes(false)
                    }
                    onChange={e => resetCategoriesCheckboxes(e.target.checked)}
                  />
                  <span className="color-headline">Todos</span>
                </li>
                {categories.map(category => (
                  <li key={category.value} className="flex items-center">
                    <Checkbox
                      className="p-0 color-primary"
                      checked={categoriesCheckedState[category.value]}
                      onChange={e =>
                        setCategoriesCheckedState({
                          ...categoriesCheckedState,
                          [category.value]: e.target.checked
                        })
                      }
                    />
                    <span>
                      {category.readable[0].toUpperCase() +
                        category.readable.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="b-bottom-transparent p-2">
              <div className="flex items-center">
                <h4>Áreas de atuação</h4>
              </div>
              <ul className="max-h-36 overflow-y-auto">
                <li className="flex items-center">
                  <Checkbox
                    className="p-0 color-primary"
                    checked={!Object.values(fieldsCheckedState).includes(false)}
                    onChange={e => resetFieldsCheckboxes(e.target.checked)}
                  />
                  <span className="color-headline">Todos</span>
                </li>
                {fields.map(field => (
                  <li key={field.id} className="flex items-center">
                    <Checkbox
                      className="p-0 color-primary"
                      checked={fieldsCheckedState[field.name]}
                      onChange={e =>
                        setFieldsCheckedState({
                          ...fieldsCheckedState,
                          [field.name]: e.target.checked
                        })
                      }
                    />
                    <span>{field.name}</span>
                  </li>
                ))}
              </ul>
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
