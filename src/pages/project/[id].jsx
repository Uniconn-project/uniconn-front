import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../../components/Page'
import ProjectInfo from '../../components/pages/project/ProjectInfo'
import ProjectHeader from '../../components/pages/project/ProjectHeader'
import Description from '../../components/pages/project/subpages/Description'
import Discussions from '../../components/pages/project/subpages/Discussions'
import Links from '../../components/pages/project/subpages/Links'
import { fetcher } from '../../hooks/useFetch'
import Members from '../../components/pages/project/subpages/Members'

export const getStaticProps = async context => {
  const project = await fetcher(`projects/get-project/${context.params.id}`)

  if (!project || !project.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export default function Project({ project }) {
  const [projectSubPage, setProjectSubPage] = useState(null)
  const [page, setPage] = useState('description')

  useEffect(() => {
    if (project && !projectSubPage) {
      setProjectSubPage(<Description project={project} />)
    }
  }, [project]) //eslint-disable-line

  if (!project || !projectSubPage) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }
  const descriptionPage = <Description project={project} />
  const discussionsPage = <Discussions project={project} />
  const linksPage = <Links project={project} />
  const studentsPage = <Members profiles={project.students} />
  const mentorsPage = <Members profiles={project.mentors} />

  return (
    <Page
      title={`${project.name} | Uniconn`}
      page="project"
      loginRequired
      header
    >
      <div className="w-full h-full flex flex-col justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProjectInfo
                project={project}
                studentsPage={studentsPage}
                mentorsPage={mentorsPage}
                setPage={setPage}
                setProjectSubPage={setProjectSubPage}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectHeader
              page={page}
              setPage={setPage}
              descriptionPage={descriptionPage}
              discussionsPage={discussionsPage}
              linksPage={linksPage}
              setProjectSubPage={setProjectSubPage}
            />
            {projectSubPage}
          </div>
        </div>
      </div>
    </Page>
  )
}
