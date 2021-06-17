import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Page from '../../components/Page'
import ProjectInfo from '../../components/pages/project/ProjectInfo'
import ProjectHeader from '../../components/pages/project/ProjectHeader'
import Description from '../../components/pages/project/subpages/description/Description'
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
      initialProject: project
    },
    revalidate: 1000 // 1 second
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export default function Project({ initialProject }) {
  const [project, setProject] = useState(null)
  const [page, setPage] = useState('description')
  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    value: ''
  })

  useEffect(() => {
    setProject(initialProject)
  }, [initialProject])

  if (!project) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }

  async function refetchProject(action) {
    setProject(null)
    const updatedProject = await fetcher(`projects/get-project/${project.id}`)
    setProject(updatedProject)

    if (action === 'edit') {
      setSuccessMsg({
        isOpen: true,
        value: 'Projeto editado com sucesso!'
      })
    } else if (action === 'invite') {
      setSuccessMsg({
        isOpen: true,
        value: 'Convites enviados!'
      })
    } else if (action === 'edit-description') {
      setSuccessMsg({
        isOpen: true,
        value: 'Descrição editada com sucesso!'
      })
    }
  }

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
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProjectInfo
                project={project}
                setPage={setPage}
                refetchProject={refetchProject}
              />
              <Snackbar
                open={successMsg.isOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessMsg({ isOpen: false, value: '' })}
              >
                <Alert severity="success">{successMsg.value}</Alert>
              </Snackbar>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectHeader page={page} setPage={setPage} />
            {page === 'description' && (
              <Description project={project} refetchProject={refetchProject} />
            )}
            {page === 'discussions' && <Discussions project={project} />}
            {page === 'links' && <Links project={project} />}
            {page === 'students' && (
              <Members
                type="student"
                project={project}
                refetchProject={refetchProject}
              />
            )}
            {page === 'mentors' && (
              <Members
                type="mentor"
                project={project}
                refetchProject={refetchProject}
              />
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}
