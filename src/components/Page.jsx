import React from 'react'
import Head from 'next/head'

export default function Page({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col justify-start items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
