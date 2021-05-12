import React from 'react'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/pages/home/ProfileMetrics'

export default function Home() {
  return (
    <Page page="Home" loginRequired header>
      <div className="w-full h-20"></div>
      <div className="w-full flex">
        <div className="flex-grow flex justify-end mr-10">
          <div style={{ width: 225 }}>
            <ProfileMetrics />
          </div>
        </div>
        <div className="flex-grow flex justify-start">
          <div style={{ width: 600 }}>
            <Projects />
          </div>
        </div>
      </div>
    </Page>
  )
}
