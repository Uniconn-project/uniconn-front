import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'
import { AuthContext } from '../contexts/Auth'

export default function Login() {
  const { loading, isAuthenticated, login } = useContext(AuthContext)

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [postData, setPostData] = useState({ username: '', password: '' })
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    let error = false
    const valuesInput = Object.values(postData)

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrorMsg({
          isOpen: true,
          message: 'Todos os campos devem ser preenchidos!'
        })
        break
      }
    }

    if (error) return

    try {
      const resp = await login(postData.username, postData.password)
      if (resp.status === 401) {
        setErrorMsg({
          isOpen: true,
          message: 'Credenciais inválidas!'
        })
      }
    } catch (error) {
      console.error(error)
      setErrorMsg({
        isOpen: true,
        message: 'Ocorreu um erro, por favor tente novamente.'
      })
    }
  }

  if (!loading && isAuthenticated) router.push('/')

  return (
    <Page title="Entrar | Uniconn" className="pt-24 sm:pt-32">
      <div className="h-full flex flex-col justify-start items-center">
        <h1 className="m-6">Entrar na Uniconn</h1>
        <form className="flex flex-col my-4">
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
          <button className="btn-primary" onClick={handleSubmit}>
            Entrar
          </button>
        </form>
        <PrimaryLink href="/signup">
          <span>Inscrever-se na Uniconn</span>
        </PrimaryLink>
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
    </Page>
  )
}
