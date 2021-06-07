import React, { useContext, useState } from 'react'
import ProfileInfo from '../components/global/ProfileInfo'
import Page from '../components/Page'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'
import ProjectBaseForm from '../components/global/ProjectBaseForm'

export default function CreateProject() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [postData, setPostData] = useState({
    name: '',
    category: '',
    slogan: '',
    markets: []
  })
  const [successIsOpen, setSuccessIsOpen] = useState(false)
  const [errorIsOpen, setErrorIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    if (
      !postData.name.length ||
      !postData.slogan.length ||
      !postData.category.length ||
      !postData.markets.length
    ) {
      setErrorIsOpen(true)
      setErrorMessage('Todos os campos devem ser preenchidos!')
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/projects/create-project`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'JWT ' + (await getToken())
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'Project created with success') {
          setSuccessIsOpen(true)
        } else {
          setErrorIsOpen(true)
          setErrorMessage(data)
        }
      })
  }

  return (
    <Page title="Criar projeto | Uniconn" page="project" loginRequired header>
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
            <div className="w-full flex items-center bg-transparent rounded-md shadow-lg p-2 mb-4">
              <h3>Criar projeto</h3>
            </div>
            <div className="w-full flex flex-col bg-transparent rounded-md shadow-lg">
              <div className="w-full p-2 b-bottom-transparent">
                <ProjectBaseForm usePostData={() => [postData, setPostData]} />
              </div>
              <div className="w-full p-4">
                <button className="btn-primary ml-auto" onClick={handleSubmit}>
                  Criar projeto
                </button>
              </div>
              <Snackbar
                open={successIsOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessIsOpen(false)}
              >
                <Alert severity="success">Projeto criado com sucesso!</Alert>
              </Snackbar>
              <Snackbar
                open={errorIsOpen}
                autoHideDuration={6000}
                onClose={() => setErrorIsOpen(false)}
              >
                <Alert severity="error">{errorMessage}</Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
