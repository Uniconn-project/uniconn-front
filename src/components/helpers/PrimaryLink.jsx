import React from 'react'
import Link from 'next/link'

export default function PrimaryLink({ children, href }) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}
