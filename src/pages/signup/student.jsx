import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Page from '../../components/Page'

export default function Student() {
  return (
    <Page title="Signup | Uniconn">
      <h1>Aluno</h1>
      <IconButton color="primary" onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>
    </Page>
  )
}
