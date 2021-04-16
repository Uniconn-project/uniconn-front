import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.text.main
  }
}))

export default function Page({ children, title }) {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`w-screen h-screen ${classes.container}`}>
        <div className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </>
  )
}
