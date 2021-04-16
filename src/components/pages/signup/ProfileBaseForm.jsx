import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import FormGroup from '@material-ui/core/FormGroup'
import FilledInput from '@material-ui/core/FilledInput'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export default function ProfileBaseForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <FormGroup className="mb-4" row>
        <FilledInput type="text" className="mr-2" placeholder="Nome" />
        <FilledInput type="text" className="ml-2" placeholder="Sobrenome" />
      </FormGroup>
      <FormGroup className="mb-4" row>
        <FilledInput
          type="text"
          className="mr-2"
          placeholder="Nome de usuário"
        />
        <FilledInput type="email" className="ml-2" placeholder="E-mail" />
      </FormGroup>
      <TextField
        id="date"
        label="Data de nascimento"
        type="date"
        defaultValue="2017-05-24"
        className="mb-4"
        InputLabelProps={{
          shrink: true
        }}
      />
      <FormGroup className="mb-4" row>
        <FilledInput
          type={showPassword ? 'text' : 'password'}
          className="mr-2"
          placeholder="Senha"
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
          className="mr-2"
          placeholder="Confirmar senha"
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
    </>
  )
}
