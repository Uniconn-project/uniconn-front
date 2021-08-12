import React, { useContext } from 'react'
import Switch from '@material-ui/core/Switch'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'
import { ThemeContext } from '../contexts/Theme'

export default function Settings() {
  const { myProfile } = useContext(MyProfileContext)
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <Page title="Configurações | Uniconn" page="settings" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <section className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
              <h3 className="color-paragraph">Configurações</h3>
            </div>
            <div className="px-2">
              <div className="w-full flex items-center bg-transparent rounded-md shadow-lg px-2">
                <span>Tema claro</span>
                <Switch
                  className="p-0"
                  checked={theme === 'light'}
                  onChange={() =>
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}
