import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'

export default function Notifications() {
  const { loading } = useContext(AuthContext)
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return (
      <Page title="Configurações | Uniconn" loginRequired={!loading} center>
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Configurações | Uniconn" page="settings" loginRequired header>
      <div className="flex h-full justify-center items-center">
        <FormControlLabel
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Tema dark"
        />
      </div>
    </Page>
  )
}
