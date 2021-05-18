import React, { useContext } from 'react'
import ProfileInfo from '../components/global/ProfileInfo'
import Page from '../components/Page'
import { MyProfileContext } from '../contexts/MyProfile'

export default function MyProfile() {
  const { myProfile } = useContext(MyProfileContext)

  return (
    <Page page="profile" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="sticky top-24 bg-light w-full h-14 rounded-md shadow-lg p-2 mb-4 flex justify-center items-center sm:top-32"></div>
          </div>
        </div>
      </div>
    </Page>
  )
}
