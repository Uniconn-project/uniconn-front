import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Page from '../../components/Page'
import ProjectInfo from '../../components/pages/project/project-info/ProjectInfo'
import ProjectHeader from '../../components/pages/project/ProjectHeader'
import Description from '../../components/pages/project/subpages/description/Description'
import Discussions from '../../components/pages/project/subpages/discussions/Discussions'
import Discussion from '../../components/pages/project/subpages/discussion/Discussion'
import Links from '../../components/pages/project/subpages/links/Links'
import Tools from '../../components/pages/project/subpages/tools/Tools'
import Members from '../../components/pages/project/subpages/members/Members'
import useFetch, { fetcher } from '../../hooks/useFetch'
import { mutate } from 'swr'
import { MyProfileContext } from '../../contexts/MyProfile'

export const getServerSideProps = async context => {
  const project = await fetcher(
    `projects/get-project/${context.params.id}`,
    {},
    true
  )

  if (!project || !project.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project: project
    }
  }
}

export default function Project(props) {
  const router = useRouter()

  const { myProfile } = useContext(MyProfileContext)

  const [successMsg, setSuccessMsg] = useState({
    isOpen: false,
    value: ''
  })

  const { data: project } = useFetch(
    `projects/get-project/${props.project.id}`,
    {
      initialData: props.project
    }
  )

  useEffect(() => {
    !router.query.page &&
      router.push(`/project/${project.id}?page=description`, undefined, {
        shallow: true
      })
  }, []) // eslint-disable-line

  if (!project || !myProfile) {
    return (
      <Page loginRequired header>
        <div className="w-full flex justify-center mt-10">
          <CircularProgress />
        </div>
      </Page>
    )
  }
  const isProjectMember = project.members
    .map(membership => membership.profile.id)
    .includes(myProfile.id)

  const isProjectAdmin = project.members
    .filter(membership => membership.role.value === 'admin')
    .map(membership => membership.profile.id)
    .includes(myProfile.id)

  const openDiscussion = discussion => {
    router.push(
      `/project/${project.id}?page=discussion&discussionId=${discussion.id}`,
      undefined,
      {
        shallow: true
      }
    )
  }

  const refetchProject = async action => {
    mutate(`projects/get-project/${props.project.id}`)

    switch (action) {
      case 'edit':
        setSuccessMsg({
          isOpen: true,
          value: 'Projeto editado com sucesso!'
        })
        break

      case 'edit-description':
        setSuccessMsg({
          isOpen: true,
          value: 'Descrição editada com sucesso!'
        })
        break

      case 'invite-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Convites enviados!'
        })
        break

      case 'uninvite-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Convite removido!'
        })
        break

      case 'add-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link adicionado!'
        })
        break

      case 'delete-link':
        setSuccessMsg({
          isOpen: true,
          value: 'Link removido!'
        })
        break

      case 'add-tool':
        setSuccessMsg({
          isOpen: true,
          value: 'Ferramenta adicionada!'
        })
        break

      case 'delete-tool':
        setSuccessMsg({
          isOpen: true,
          value: 'Ferramenta removida!'
        })
        break

      case 'remove-user':
        setSuccessMsg({
          isOpen: true,
          value: 'Usuário removido!'
        })
        break

      case 'ask-to-join-project':
        setSuccessMsg({
          isOpen: true,
          value: 'Solicitação enviada!'
        })
        break

      case 'leave-project':
        setSuccessMsg({
          isOpen: true,
          value: 'Você saiu do projeto!'
        })
        break

      case 'promote-member':
        setSuccessMsg({
          isOpen: true,
          value: 'Membro promovido!'
        })
        break
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
        <section className="mb-4 lg:mb-0 lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-full lg:w-60">
            <div className="h-full flex flex-col items-center px-2 sm:px-12 lg:px-0 lg:fixed lg:top-32">
              <ProjectInfo
                project={project}
                isProjectAdmin={isProjectAdmin}
                refetchProject={refetchProject}
              />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <ProjectHeader
              project={project}
              page={router.query.page}
              isProjectMember={isProjectMember}
            />
            <div style={{ height: '80vh' }}>
              {router.query.page === 'description' && (
                <Description
                  project={project}
                  isProjectAdmin={isProjectAdmin}
                  refetchProject={refetchProject}
                />
              )}
              {router.query.page === 'discussions' && (
                <Discussions
                  project={project}
                  isProjectMember={isProjectMember}
                  isProjectAdmin={isProjectAdmin}
                  openDiscussion={openDiscussion}
                />
              )}
              {router.query.page === 'discussion' && <Discussion />}
              {router.query.page === 'links' && (
                <Links
                  project={project}
                  isProjectMember={isProjectMember}
                  refetchProject={refetchProject}
                />
              )}
              {isProjectMember && router.query.page === 'tools' && (
                <Tools project={project} refetchProject={refetchProject} />
              )}
              {router.query.page === 'members' && (
                <Members
                  project={project}
                  isProjectMember={isProjectMember}
                  isProjectAdmin={isProjectAdmin}
                  refetchProject={refetchProject}
                />
              )}
            </div>
          </div>
          <Snackbar
            open={successMsg.isOpen}
            autoHideDuration={6000}
            onClose={() => setSuccessMsg({ isOpen: false, value: '' })}
          >
            <Alert severity="success">{successMsg.value}</Alert>
          </Snackbar>
        </section>
      </div>
    </Page>
  )
}
