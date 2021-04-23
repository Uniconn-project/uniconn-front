import React, { useCallback, useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Header from './Header'
import { AuthContext } from '../context/Auth'
import { MyProfileContext } from '../context/MyProfile'
import { fetcher } from '../hooks/useFetch'

export default function Page({
  children,
  title,
  loginRequired = false,
  center = false,
  header = false
}) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const { myProfile, setMyProfile } = useContext(MyProfileContext)

  const fetchMyProfile = useCallback(async () => {
    const data = await fetcher('profiles/student/get-my-profile', {
      Authorization: 'JWT ' + (await getToken())
    })
    setMyProfile(data)
  }, [setMyProfile, getToken])

  useEffect(() => {
    if (
      (loginRequired && !isAuthenticated) ||
      (!loginRequired && isAuthenticated)
    ) {
      Router.replace('/')
    }
  }, [loginRequired, isAuthenticated])

  useEffect(() => {
    if (!myProfile && isAuthenticated) {
      fetchMyProfile()
    }
  }, [myProfile, isAuthenticated, fetchMyProfile])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-screen h-screen">
        <div
          className={`w-full h-full flex flex-col justify-${
            center ? 'center' : 'start'
          } items-center`}
        >
          {header && <Header />}
          {children}
        </div>
      </div>
    </div>
  )
}
