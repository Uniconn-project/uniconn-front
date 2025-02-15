import React, { useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import FormGroup from '@material-ui/core/FormGroup'
import FilledInput from '@material-ui/core/FilledInput'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'
import UniversityMajorSkillsForm from '../components/global/UniversityMajorSkillsForm'
import { AuthContext } from '../contexts/Auth'

export default function Signup() {
  const [postData, setPostData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birth_date: '',
    password: '',
    passwordc: '',
    is_attending_university: false,
    university_name: '',
    major_name: '',
    skills_names: []
  })

  const { login } = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) Router.push('/')

  useEffect(() => {
    Router.prefetch('/projects')
  }, [])

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    for (const key of [
      'first_name',
      'last_name',
      'username',
      'email',
      'birth_date',
      'password'
    ]) {
      if (!postData[key]) {
        setErrorMsg({
          isOpen: true,
          message: 'Todos os campos devem ser preenchidos!'
        })
        return
      }
    }

    if (postData.password !== postData.passwordc) {
      setErrorMsg({
        isOpen: true,
        message: 'As senhas devem ser iguais!'
      })
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/post-signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...postData })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          login(
            postData.username.toLowerCase().replace(' ', ''),
            postData.password
          ).then(() => {
            Router.push('/projects')
          })
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
    <Page title="Criar conta | Uniconn" className="pt-6 sm:pt-12 lg:pt-12">
      <h1 className="m-6">Criar conta</h1>
      <form className="flex flex-col items-center my-4">
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <FilledInput
            type="text"
            className="w-2/5 mr-2"
            placeholder="Nome"
            inputProps={{ maxLength: 30 }}
            onChange={handleChange('first_name')}
          />
          <FilledInput
            type="text"
            className="w-2/5 ml-2"
            placeholder="Sobrenome"
            inputProps={{ maxLength: 30 }}
            onChange={handleChange('last_name')}
          />
        </FormGroup>
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <FilledInput
            type="text"
            className="w-2/5 mr-2"
            placeholder="Nome de usuário"
            inputProps={{ maxLength: 25 }}
            onChange={handleChange('username')}
          />
          <FilledInput
            type="email"
            className="w-2/5 ml-2"
            placeholder="E-mail"
            inputProps={{ maxLength: 50 }}
            onChange={handleChange('email')}
          />
        </FormGroup>
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <TextField
            id="date"
            label="Data de nascimento"
            type="date"
            style={{ width: 'calc(80% + 1rem)' }}
            onChange={handleChange('birth_date')}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <FilledInput
            type={showPassword ? 'text' : 'password'}
            className="w-2/5 mr-2"
            placeholder="Senha"
            inputProps={{ maxLength: 50 }}
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
          <FilledInput
            type={showPassword ? 'text' : 'password'}
            className="w-2/5 ml-2"
            placeholder="Confirmar senha"
            inputProps={{ maxLength: 50 }}
            onChange={handleChange('passwordc')}
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
        </FormGroup>
        <UniversityMajorSkillsForm
          usePostData={() => [postData, setPostData]}
        />
        <button
          data-cy="signup-submit-button"
          className="btn-primary w-4/5"
          onClick={handleSubmit}
        >
          Criar conta
        </button>
      </form>
      <PrimaryLink href="/login">
        <span>Já tem uma conta?</span>
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
    </Page>
  )
}
