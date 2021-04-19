import React, { useContext, useState } from 'react'
import Router from 'next/router'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'
import { AuthContext } from '../context/Auth'

export default function Login() {
  const [errMessage, setErrMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [postData, setPostData] = useState({ username: '', password: '' })
  const { loading, isAuthenticated, login } = useContext(AuthContext)

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleSubmit = async () => {
    setErrMessage('')
    let error = false
    const valuesInput = Object.values(postData)

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrMessage('Todos os campos devem ser preenchidos!')
        break
      }
    }

    if (error) return

    try {
      const resp = await login(postData.username, postData.password)
      if (resp.status === 401) {
        setErrMessage('Invalid login credentials')
      }
    } catch (error) {
      console.error(error)
      // TODO: actually parse api 400 error messages
      setErrMessage(error.message)
    }

    /* fetch(`${process.env.NEXT_PUBLIC_API_URL}token/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        const keys = Object.keys(data)
        if (!keys.includes('access') || !keys.includes('refresh')) {
          setErrMessage('Credenciais inválidas!')
        } else {
          process.env.NODE_ENV === 'development' && console.log(data)
        }
      }) */
  }

  if (!loading && isAuthenticated) Router.push('/')

  return (
    <Page title="Login | Uniconn">
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <h1 className="m-6">Entrar na Uniconn</h1>
        {errMessage !== null && (
          <div>
            <Alert severity="error">{errMessage}</Alert>
          </div>
        )}
        <div className="flex flex-col my-4">
          <FilledInput
            type="text"
            className="mb-4"
            placeholder="Nome de usuário"
            onChange={handleChange('username')}
          />
          <FilledInput
            type={showPassword ? 'text' : 'password'}
            className="mb-4"
            placeholder="Senha"
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Entrar
          </Button>
        </div>
        <PrimaryLink href="/signup">
          <span>Inscrever-se na Uniconn</span>
        </PrimaryLink>
      </div>
    </Page>
  )
}
