import React, { useContext, useEffect } from 'react'
import Page from '../components/Page'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import { MyProfileContext } from '../contexts/MyProfile'
import io from 'socket.io-client'

const socket = io('ws://localhost:8080')

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('message', data => {
      console.log(data)
    })
  }, [])

  return (
    <Page title="Mensagens | Uniconn" page="messages" loginRequired header>
      <div className="flex justify-center w-full h-full">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            <div className="px-2">
              <button
                className="btn-primary"
                onClick={() => socket.emit('message', { value: 'Olá' })}
              >
                Def
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
