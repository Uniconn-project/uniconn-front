import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Page from '../../components/Page'

export default function Student() {
  return (
    <Page title="Signup | Uniconn">
      <h1>Aluno</h1>
      <IconButton color="primary" onClick={() => window.history.back()}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Page>
  )
}
