import React, { useContext, useState } from 'react'
import ProfileInfo from '../components/global/ProfileInfo'
import Page from '../components/Page'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import useFetch from '../hooks/useFetch'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'

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

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleDeleteMarket = marketName => {
    setPostData({
      ...postData,
      markets: postData.markets.filter(market => market !== marketName)
    })
  }

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

  if (!categories || !markets) {
    return (
      <div className="flex justify-content">
        <CircularProgress />
      </div>
    )
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
                <div className="w-full flex justify-between items-center mb-2">
                  <TextField
                    className="w-5/12"
                    label="Nome"
                    onChange={handleChange('name')}
                  />
                  <FormControl className="w-5/12">
                    <InputLabel id="category-select-label">
                      Categoria
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      value={postData.category}
                      onChange={handleChange('category')}
                    >
                      {categories.map(category => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.readable[0].toUpperCase()}
                          {category.readable.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full mb-2">
                  <FormControl className="w-full">
                    <InputLabel id="markets-select-label">Mercados</InputLabel>
                    <Select
                      labelId="markets-select-label"
                      value={postData.markets}
                      multiple
                      onChange={handleChange('markets')}
                      renderValue={selected => (
                        <div>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              className="b-primary mr-1"
                              onMouseDown={e => e.stopPropagation()}
                              onDelete={() => handleDeleteMarket(value)}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {markets.map(market => (
                        <MenuItem key={market.id} value={market.name}>
                          {market.name[0].toUpperCase()}
                          {market.name.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full mb-2">
                  <TextField
                    className="w-full"
                    label="Slogan"
                    helperText="Frase descrevendo seu projeto"
                    onChange={handleChange('slogan')}
                  />
                </div>
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
