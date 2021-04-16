import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IsAuthContext } from '../context/IsAuth'

export default function Index() {
  const [isAuth] = useContext(IsAuthContext)

  const router = useRouter()

  useEffect(() => {
    if (isAuth === null) return

    if (isAuth) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [isAuth])

  return (
    <div className="flex justify-center items-center">
      <div>Loading...</div>
    </div>
  )
}
