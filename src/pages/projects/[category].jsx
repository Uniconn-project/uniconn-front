import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProfileInfo from '../../components/global/profile-info/ProfileInfo'
import ProjectList from '../../components/global/ProjectList'
import Page from '../../components/Page'
import { MyProfileContext } from '../../contexts/MyProfile'
import useFetch from '../../hooks/useFetch'
import { mutate } from 'swr'

const readableCategories = {
  startup: 'Startups',
  social_project: 'Projetos Sociais',
  academic: 'Projetos Acadêmicos'
}

export default function Category() {
  const { myProfile } = useContext(MyProfileContext)

  const router = useRouter()
  const [scrollCount, setScrollCount] = useState(1)

  const { data: projectList } = useFetch(
    `projects/get-projects-list?categories=${router.query.category}`
  )

  const handleScroll = useCallback(() => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    ) {
      setScrollCount(scrollCount => scrollCount + 1)
    }
  }, [])

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/projects/get-projects-list?length=${scrollCount * 10}&categories=${
        router.query.category
      }`
    )
      .then(response => response.json())
      .then(data => {
        mutate(
          `projects/get-projects-list?categories=${router.query.category}`,
          data,
          false
        )
      })
  }, [scrollCount]) // eslint-disable-line

  if (!myProfile.id || !projectList) {
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
            <div className="sticky z-10 top-24 w-full mb-4 sm:top-32">
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
                  {readableCategories[router.query.category]}
                </h3>
              </div>
            </div>
            <div className="w-full flex flex-col items-center px-2">
              <ProjectList projects={projectList.projects} />
              {!projectList.isall && (
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
