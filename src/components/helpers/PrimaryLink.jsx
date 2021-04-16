import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  primaryLink: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  }
}))

export default function PrimaryLink({ children, href }) {
  const classes = useStyles()
  return (
    <Link href={href}>
      <div className={classes.primaryLink}>{children}</div>
    </Link>
  )
}
