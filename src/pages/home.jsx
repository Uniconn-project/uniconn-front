import React from 'react'
import FilterListIcon from '@material-ui/icons/FilterList'
import Page from '../components/Page'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/pages/home/ProfileMetrics'

export default function Home() {
  return (
    <Page title="Home | Uniconn" page="home" loginRequired header>
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:flex-grow lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div style={{ width: 225 }}>
            <div className="h-full fixed top-32">
              <ProfileMetrics />
            </div>
          </div>
        </div>
        <div
          className="flex justify-center lg:justify-start lg:box-border"
          style={{ flexGrow: 2 }}
        >
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="bg-transparent w-full h-14 rounded-md shadow-lg mb-4 p-2 flex items-center">
              <input
                type="text"
                placeholder="Pesquisar projeto..."
                className="bg-transparent p-2"
              />
              <FilterListIcon className="ml-auto cursor-pointer" />
            </div>
            <Projects />
          </div>
        </div>
      </div>
    </Page>
  )
}
