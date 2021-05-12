import React from 'react'
import Header from '../components/Header'
import Projects from '../components/pages/home/Projects'
import ProfileMetrics from '../components/pages/home/ProfileMetrics'

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Header page={'Uniccon'}></Header>
      <div className="flex justify-between w-full">
        <div>
          <ProfileMetrics></ProfileMetrics>
        </div>
        <div>
          <Projects></Projects>
        </div>
      </div>
    </div>
  )
}
