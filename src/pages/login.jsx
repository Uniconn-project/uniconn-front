import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(router.query.success || null)
  const [showPassword, setShowPassword] = useState(false)
  const [postData, setPostData] = useState({ username: '', password: '' })
  const { loading, isAuthenticated, login } = useContext(AuthContext)

  useEffect(() => {
    if (errorMsg !== null) {
      setSuccessMsg(null)
    }
  }, [errorMsg])

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleSubmit = async () => {
    let error = false
    const valuesInput = Object.values(postData)

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrorMsg('Todos os campos devem ser preenchidos!')
        break
      }
    }

    if (error) return

    try {
      const resp = await login(postData.username, postData.password)
      if (resp.status === 401) {
        setErrorMsg('Credenciais inválidas!')
      }
    } catch (error) {
      console.error(error)
      setErrorMsg('Occoreu um erro, por favor tente novamente.')
    }
  }

  if (!loading && isAuthenticated) router.push('/')

  return (
    <Page title="Login | Uniconn" className="h-screen">
      <div className="h-full flex flex-col justify-start items-center">
        <h1 className="m-6">Entrar na Uniconn</h1>
        {errorMsg !== null && (
          <div>
            <Alert severity="error">{errorMsg}</Alert>
          </div>
        )}
        {successMsg !== null && (
          <div>
            <Alert severity="success">{successMsg}</Alert>
          </div>
        )}
        <div className="flex flex-col my-4">
          <FilledInput
            type="text"
            className="mb-4"
            placeholder="Nome de usuário"
            onChange={handleChange('username')}
            onKeyUp={e => e.key === 'Enter' && handleSubmit()}
          />
          <FilledInput
            type={showPassword ? 'text' : 'password'}
            className="mb-4"
            placeholder="Senha"
            onChange={handleChange('password')}
            onKeyUp={e => e.key === 'Enter' && handleSubmit()}
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
        </div>
        <PrimaryLink href="/signup">
          <span>Inscrever-se na Uniconn</span>
        </PrimaryLink>
      </div>
    </Page>
  )
}
