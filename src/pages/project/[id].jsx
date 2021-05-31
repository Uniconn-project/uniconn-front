import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../../components/Page'
import ProjectInfo from '../../components/pages/project/ProjectInfo'
import { fetcher } from '../../hooks/useFetch'

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
  if (!project) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page
      title={`${project.name} | Uniconn`}
      page="project"
      loginRequired
      header
    >
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProjectInfo project={project} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}></div>
        </div>
      </div>
    </Page>
  )
}
