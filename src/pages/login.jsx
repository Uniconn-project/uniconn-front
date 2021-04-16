import React from 'react'
import TextField from '@material-ui/core/TextField'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'

export default function Login() {
  return (
    <Page title="Login | Uniconn">
      <h1>Entrar</h1>
      <div className="flex flex-col">
        <TextField label="E-mail" />
        <TextField label="Senha" />
      </div>
      <div className="flex items-center text-xs">
        <PrimaryLink href="/signup">
          <span>Inscrever-se na Uniconn</span>
        </PrimaryLink>
      </div>
    </Page>
  )
}
