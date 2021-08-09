import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import TuneIcon from '@material-ui/icons/Tune'
import CircularProgress from '@material-ui/core/CircularProgress'
import useFetch, { fetcher } from '../../../hooks/useFetch'
import { formattedQueryString } from '../../../utils/utils'

export default function ProfilesFilter({
  baseProfiles,
  setProfiles,
  setQueryParams
}) {
  const [search, setSearch] = useState('')
  const [filterHeight, setFilterHeight] = useState(0)
  const [isAttUnivCheckedState, setIsAttUnivCheckedState] = useState({
    yes: true,
    no: true
  })
  const [universitiesCheckedState, setUniversitiesCheckedState] = useState(null)
  const [majorsCheckedState, setMajorsCheckedState] = useState(null)
  const [skillsCheckedState, setSkillsCheckedState] = useState(null)

  const { data: universities } = useFetch(
    'universities/get-universities-name-list'
  )

  const { data: majors } = useFetch('universities/get-majors-name-list')

  const { data: skills } = useFetch('profiles/get-skills-name-list')

  useEffect(() => {
    if (!search.trim().length) {
      setProfiles(baseProfiles)
      return
    }

    ;(async () => {
      const data = await fetcher(`profiles/get-filtered-profiles/${search}`)
      setProfiles(data)
    })()
  }, [search]) // eslint-disable-line

  useEffect(() => {
    if (!universities || universitiesCheckedState) return

    resetUniversitiesCheckboxes(true)
  }, [universities]) // eslint-disable-line

  useEffect(() => {
    if (!majors || majorsCheckedState) return

    resetMajorsCheckboxes(true)
  }, [majors]) // eslint-disable-line

  useEffect(() => {
    if (!skills || skillsCheckedState) return

    resetSkillsCheckboxes(true)
  }, [skills]) // eslint-disable-line

  const resetUniversitiesCheckboxes = checked => {
    const checkedState = {}

    for (const university of universities) {
      checkedState[university.name] = checked
    }

    setUniversitiesCheckedState(checkedState)
  }

  const resetMajorsCheckboxes = checked => {
    const checkedState = {}

    for (const major of majors) {
      checkedState[major.name] = checked
    }

    setMajorsCheckedState(checkedState)
  }

  const resetSkillsCheckboxes = checked => {
    const checkedState = {}

    for (const skill of skills) {
      checkedState[skill.name] = checked
    }

    setSkillsCheckedState(checkedState)
  }

  const handleFilterSubmit = async () => {
    const selectedUniversities = Object.keys(universitiesCheckedState).filter(
      key => universitiesCheckedState[key]
    )
    const selectedMajors = Object.keys(majorsCheckedState).filter(
      key => majorsCheckedState[key]
    )

    const selectedSkills = Object.keys(skillsCheckedState).filter(
      key => skillsCheckedState[key]
    )

    const skillsQ = `&skills=${selectedSkills.join(';')}`
    const isAttUnivQ =
      isAttUnivCheckedState.yes !== isAttUnivCheckedState.no
        ? `&is_attending_university=${Object.keys(isAttUnivCheckedState).find(
            key => isAttUnivCheckedState[key]
          )}`
        : ''
    const universitiesQ = isAttUnivCheckedState.yes
      ? `&universities=${selectedUniversities.join(';')}`
      : ''
    const majorsQ = isAttUnivCheckedState.yes
      ? `&majors=${selectedMajors.join(';')}`
      : ''

    const queryParams = `${skillsQ}${isAttUnivQ}${universitiesQ}${majorsQ}`
    console.log(queryParams)
    setQueryParams(formattedQueryString(queryParams))
    setFilterHeight(0)
  }

  if (!universitiesCheckedState || !majorsCheckedState || !skillsCheckedState) {
    return <CircularProgress size={30} />
  }

  return (
    <div className="sticky z-10 top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light m-h-14 rounded-md shadow-lg p-2 flex flex-col">
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Pesquisar usuários..."
            className="w-9/12 bg-transparent p-2"
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
          <Tooltip title="Filtrar usuários" placement="top" arrow>
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
                <h4>Cursando universidade</h4>
              </div>
              <ul className="max-h-36 overflow-y-auto">
                <li className="flex items-center">
                  <Checkbox
                    className="p-0 color-primary"
                    checked={isAttUnivCheckedState.yes}
                    onChange={e =>
                      setIsAttUnivCheckedState({
                        ...isAttUnivCheckedState,
                        yes: e.target.checked
                      })
                    }
                  />
                  <span>Sim</span>
                </li>
                <li className="flex items-center">
                  <Checkbox
                    className="p-0 color-primary"
                    checked={isAttUnivCheckedState.no}
                    onChange={e =>
                      setIsAttUnivCheckedState({
                        ...isAttUnivCheckedState,
                        no: e.target.checked
                      })
                    }
                  />
                  <span>Não</span>
                </li>
              </ul>
            </div>
            <AnimateHeight height={isAttUnivCheckedState.yes ? 'auto' : '0'}>
              <>
                <div className="b-bottom-transparent p-2">
                  <div className="flex items-center">
                    <h4>
                      Universidades{' '}
                      <span className="color-paragraph text-sm">
                        (Apenas para universitários)
                      </span>
                    </h4>
                  </div>
                  <ul className="max-h-36 overflow-y-auto">
                    <li className="flex items-center">
                      <Checkbox
                        className="p-0 color-primary"
                        checked={
                          !Object.values(universitiesCheckedState).includes(
                            false
                          )
                        }
                        onChange={e =>
                          resetUniversitiesCheckboxes(e.target.checked)
                        }
                      />
                      <span className="color-headline">Todos</span>
                    </li>
                    {universities.map(university => (
                      <li key={university.id} className="flex items-center">
                        <Checkbox
                          className="p-0 color-primary"
                          checked={universitiesCheckedState[university.name]}
                          onChange={e =>
                            setUniversitiesCheckedState({
                              ...universitiesCheckedState,
                              [university.name]: e.target.checked
                            })
                          }
                        />
                        <span>{university.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="b-bottom-transparent p-2">
                  <div className="flex items-center">
                    <h4>
                      Cursos{' '}
                      <span className="color-paragraph text-sm">
                        (Apenas para universitários)
                      </span>
                    </h4>
                  </div>
                  <ul className="max-h-36 overflow-y-auto">
                    <li className="flex items-center">
                      <Checkbox
                        className="p-0 color-primary"
                        checked={
                          !Object.values(majorsCheckedState).includes(false)
                        }
                        onChange={e => resetMajorsCheckboxes(e.target.checked)}
                      />
                      <span className="color-headline">Todos</span>
                    </li>
                    {majors.map(major => (
                      <li key={major.id} className="flex items-center">
                        <Checkbox
                          className="p-0 color-primary"
                          checked={majorsCheckedState[major.name]}
                          onChange={e =>
                            setMajorsCheckedState({
                              ...majorsCheckedState,
                              [major.name]: e.target.checked
                            })
                          }
                        />
                        <span>{major.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            </AnimateHeight>
            <div className="b-bottom-transparent p-2">
              <div className="flex items-center">
                <h4>Habilidades</h4>
              </div>
              <ul className="max-h-36 overflow-y-auto">
                <li className="flex items-center">
                  <Checkbox
                    className="p-0 color-primary"
                    checked={!Object.values(skillsCheckedState).includes(false)}
                    onChange={e => resetSkillsCheckboxes(e.target.checked)}
                  />
                  <span className="color-headline">Todos</span>
                </li>
                {skills.map(skill => (
                  <li key={skill.id} className="flex items-center">
                    <Checkbox
                      className="p-0 color-primary"
                      checked={skillsCheckedState[skill.name]}
                      onChange={e =>
                        setSkillsCheckedState({
                          ...skillsCheckedState,
                          [skill.name]: e.target.checked
                        })
                      }
                    />
                    <span>{skill.name}</span>
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
