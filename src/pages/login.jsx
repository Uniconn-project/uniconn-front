import React from 'react'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <Link href="/signup">
        <div>signup</div>
      </Link>
    </div>
  )
}
