import React from 'react'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/pages/home/ProfileMetrics'

export default function Home() {
  return (
    <Page page="home" loginRequired header>
      <div className="w-full h-full flex">
        <div className="flex-grow flex justify-end mr-10 box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileMetrics />
            </div>
          </div>
        </div>
        <div className="flex-grow flex justify-start box-border">
          <div style={{ width: 600 }}>
            <Projects />
          </div>
        </div>
      </div>
    </Page>
  )
}
