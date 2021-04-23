import React, { useState } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Alert from '@material-ui/lab/Alert'
import FormGroup from '@material-ui/core/FormGroup'
import FilledInput from '@material-ui/core/FilledInput'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export default function BaseForm({ children, parentPostData, type }) {
  const [errorMsg, setErrorMsg] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [profilePostData, setProfilePostData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birth_date: '',
    password: '',
    passwordc: ''
  })

  const handleChange = key => e => {
    setProfilePostData({ ...profilePostData, [key]: e.target.value })
  }

  const handleSubmit = () => {
    let error = false

    const valuesInput = Object.values({ ...parentPostData, ...profilePostData })

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrorMsg('Todos os campos devem ser preenchidos!')
        break
      }
    }

    if (profilePostData.password !== profilePostData.passwordc) {
      error = true
      setErrorMsg('As senhas devem ser iguais!')
    }

    if (error) return

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/${type}/post-signup`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ ...parentPostData, ...profilePostData })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          process.env.NODE_ENV === 'development' && console.log(data)
          Router.push('/home')
        } else {
          setErrorMsg(data)
        }
      })
  }

  return (
    <>
      {errorMsg !== null && (
        <div>
          <Alert severity="error">{errorMsg}</Alert>
        </div>
      )}
      <div className="flex flex-col items-center my-4">
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <FilledInput
            type="text"
            className="w-2/5 mr-2"
            placeholder="Nome"
            onChange={handleChange('first_name')}
          />
          <FilledInput
            type="text"
            className="w-2/5 ml-2"
            placeholder="Sobrenome"
            onChange={handleChange('last_name')}
          />
        </FormGroup>
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <FilledInput
            type="text"
            className="w-2/5 mr-2"
            placeholder="Nome de usuário"
            onChange={handleChange('username')}
          />
          <FilledInput
            type="email"
            className="w-2/5 ml-2"
            placeholder="E-mail"
            onChange={handleChange('email')}
          />
        </FormGroup>
        <FormGroup className="w-full mb-4 justify-center items-center" row>
          <TextField
            id="date"
            label="Data de nascimento"
            type="date"
            className="w-4/5 mr-2"
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
        {children}
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-4/5"
        onClick={handleSubmit}
      >
        Criar conta
      </Button>
      <IconButton color="primary" onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>
    </>
  )
}
