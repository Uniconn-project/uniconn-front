import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProfileInfo from '../../components/global/profile-info/ProfileInfo'
import ProjectList from '../../components/global/ProjectList'
import Page from '../../components/Page'
import { MyProfileContext } from '../../contexts/MyProfile'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getServerSideProps = async context => {
  const projects = await fetcher(
    `projects/get-category-projects-list/${context.params.category}`
  )

  return {
    props: {
      initialProjects: projects,
      category: context.params.category
    }
  }
}

const readableCategories = {
  startup: 'Startups',
  social_project: 'Projetos Sociais',
  academic: 'Projetos Acadêmicos'
}

export default function Category({ initialProjects, category }) {
  const { myProfile } = useContext(MyProfileContext)

  const { data: projects } = useFetch('projects/get-category-projects-list', {
    initialData: initialProjects
  })

  if (!myProfile) {
    return (
      <Page title="Projetos | Uniconn" loginRequired header>
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page title="Projetos | Uniconn" loginRequired header>
      {projects && (
        <div className="justify-center w-full h-full flex">
          <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
            <div className="w-60">
              <div className="h-full fixed top-32">
                <ProfileInfo profile={myProfile} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
            <div className="w-full" style={{ maxWidth: 600 }}>
              <div className="sticky top-24 w-full mb-4 sm:top-32">
                <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
                  {window.history.length > 1 && (
                    <div
                      className="p-1 mr-2 rounded-3xl bg-transparent-hover cursor-pointer"
                      onClick={() => window.history.back()}
                    >
                      <ArrowBackIcon className="icon-sm color-primary" />
                    </div>
                  )}
                  <h3 className="color-paragraph">
                    {readableCategories[category]}
                  </h3>
                </div>
              </div>
              <div className="w-full flex flex-col items-center px-2">
                <ProjectList projects={projects} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  )
}
