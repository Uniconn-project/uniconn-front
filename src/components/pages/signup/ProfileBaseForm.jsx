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
      <FormGroup className="w-full mb-4 justify-center items-center" row>
        <FilledInput type="text" className="w-2/5 mr-2" placeholder="Nome" />
        <FilledInput
          type="text"
          className="w-2/5 ml-2"
          placeholder="Sobrenome"
        />
      </FormGroup>
      <FormGroup className="w-full mb-4 justify-center items-center" row>
        <FilledInput
          type="text"
          className="w-2/5 mr-2"
          placeholder="Nome de usuário"
        />
        <FilledInput type="email" className="w-2/5 ml-2" placeholder="E-mail" />
      </FormGroup>
      <FormGroup className="w-full mb-4 justify-center items-center" row>
        <TextField
          id="date"
          label="Data de nascimento"
          type="date"
          className="w-4/5 mr-2"
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
