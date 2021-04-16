import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [postData, setPostData] = useState({ email: '', password: '' })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  return (
    <Page title="Login | Uniconn">
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <Image src="/unicorn.svg" height={100} width={100} />
        <h1 className="m-6">Entrar na Uniconn</h1>
        <div className="flex flex-col my-4">
          <FilledInput
            type="text"
            className="mb-4"
            placeholder="E-mail"
            onChange={handleChange('email')}
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
          <Button variant="contained" color="primary">
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
