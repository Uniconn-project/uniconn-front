import React, { useContext, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import Router from 'next/router'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'
import ProjectBaseForm from '../components/global/ProjectBaseForm'

export default function CreateProject() {
  const { myProfile, refetchMyProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [postData, setPostData] = useState({
    name: '',
    category: '',
    slogan: '',
    fields: []
  })
  const [successIsOpen, setSuccessIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    if (
      !postData.name.length ||
      !postData.slogan.length ||
      !postData.category.length ||
      !postData.fields.length
    ) {
      setErrorMsg({
        isOpen: true,
        message: 'Todos os campos devem ser preenchidos!'
      })
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/projects/create-project`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'JWT ' + (await getToken())
      },
      body: JSON.stringify(postData)
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          refetchMyProfile()
          setSuccessIsOpen(true)
          Router.push(`/project/${data}?page=description`)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }

  return (
    <Page title="Criar projeto | Uniconn" page="project" loginRequired header>
      <div className="flex justify-center w-full h-full">
        <section className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
              <div
                className="p-1 mr-2 rounded-3xl bg-transparent-hover cursor-pointer"
                onClick={() => window.history.back()}
              >
                <ArrowBackIcon className="icon-sm color-primary" />
              </div>
              <h3 className="color-paragraph">Criar projeto</h3>
            </div>
            <form className="w-full flex flex-col bg-transparent rounded-md shadow-lg">
              <div className="w-full p-2 b-bottom-transparent">
                <ProjectBaseForm usePostData={() => [postData, setPostData]} />
              </div>
              <div className="w-full p-4">
                <button className="btn-primary ml-auto" onClick={handleSubmit}>
                  Criar projeto
                </button>
              </div>
            </form>
            <Snackbar
              open={successIsOpen}
              autoHideDuration={6000}
              onClose={() => setSuccessIsOpen(false)}
            >
              <Alert severity="success">Projeto criado com sucesso!</Alert>
            </Snackbar>
            <Snackbar
              open={errorMsg.isOpen}
              autoHideDuration={6000}
              onClose={() =>
                setErrorMsg({
                  isOpen: false,
                  message: ''
                })
              }
            >
              <Alert severity="error">{errorMsg.message}</Alert>
            </Snackbar>
          </div>
        </section>
      </div>
    </Page>
  )
}
