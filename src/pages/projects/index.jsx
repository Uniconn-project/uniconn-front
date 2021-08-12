import React, { useContext, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../../components/Page'
import ProjectList from '../../components/global/ProjectList'
import ProfileInfo from '../../components/global/profile-info/ProfileInfo'
import ProjectsFilter from '../../components/pages/projects/ProjectsFilter'
import useFetch, { fetcher } from '../../hooks/useFetch'
import { MyProfileContext } from '../../contexts/MyProfile'
import { mutate } from 'swr'

export default function Projects() {
  const { myProfile } = useContext(MyProfileContext)
  const { data: baseProjects } = useFetch('projects/get-projects-list')

  const [queryParams, setQueryParams] = useState('')
  const [scrollCount, setScrollCount] = useState(1)
  const [renderedProjects, setRenderedProjects] = useState([])
  const [projectsAreFiltered, setProjectsAreFiltered] = useState(false)

  const handleScroll = useCallback(() => {
    if (projectsAreFiltered) return

    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      setScrollCount(scrollCount => scrollCount + 1)
    }
  }, [projectsAreFiltered])

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    ;(async () => {
      const data = await fetcher(
        `projects/get-projects-list?length=${scrollCount * 10}${queryParams}`
      )
      mutate('projects/get-projects-list', data, false)
      setRenderedProjects(data.projects)
    })()
  }, [scrollCount, queryParams])

  useEffect(() => {
    if (!baseProjects) return
    setProjectsAreFiltered(
      baseProjects.projects.length > renderedProjects.length
    )
  }, [baseProjects, renderedProjects])

  useEffect(() => {
    if (!baseProjects || renderedProjects.length) return
    setRenderedProjects(baseProjects.projects)
  }, [baseProjects]) //eslint-disable-line

  if (!myProfile || !baseProjects) {
    return (
      <Page title="Usuários | Uniconn" page="projects" loginRequired header>
        <CircularProgress />
      </Page>
    )
  }

  return (
    <Page title="Projetos | Uniconn" page="projects" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <section className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectsFilter
              baseProjects={baseProjects.projects}
              setRenderedProjects={setRenderedProjects}
              setQueryParams={setQueryParams}
            />
            <div className="w-full flex flex-col items-center px-2 pt-14">
              <Link href="/create-project">
                <div className="w-full flex items-center cursor-pointer bg-transparent bg-hover color-primary rounded-md shadow-lg p-3 mb-4 mt-3">
                  <AddIcon className="mr-2" />
                  <strong>Criar Projeto</strong>
                </div>
              </Link>
              <ProjectList projects={renderedProjects} />
              {!projectsAreFiltered && !baseProjects.isall && (
                <div className="w-full flex justify-center p-4">
                  <CircularProgress size={30} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}
