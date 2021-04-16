import React from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Link from 'next/link'
import Page from '../components/Page'

export default function Login() {
  return (
    <Page title="Login | Uniconn">
      <h1>Entrar</h1>
      <div className="flex flex-col">
        <TextField label="E-mail" />
        <TextField label="Senha" />
      </div>
      <div className="flex items-center text-xs">
        <spa>Inscrever-se na Uniconn</spa>
        <Link href="/signup">
          <IconButton color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </Link>
      </div>
    </Page>
  )
}
