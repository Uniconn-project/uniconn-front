import React from 'react'
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Page from '../../components/Page'
import ProfileBaseForm from '../../components/pages/signup/ProfileBaseForm'

export default function Student() {
  return (
    <Page title="Signup | Uniconn">
      <Image src="/unicorn.svg" height={100} width={100} />
      <h1>Aluno</h1>
      <ProfileBaseForm />
      <Button variant="contained" color="primary">
        Criar conta
      </Button>
      <IconButton color="primary" onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>
    </Page>
  )
}
