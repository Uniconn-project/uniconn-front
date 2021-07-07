import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from 'react'
import { AuthContext } from './Auth'
import { fetcher } from '../hooks/useFetch'

export const MyProfileContext = createContext()

export default function MyProfileProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const [myProfile, setMyProfile] = useState(null)

  const fetchMyProfile = useCallback(async () => {
    const fetchedProfile = await fetcher('profiles/get-my-profile', {
      Authorization: 'JWT ' + (await getToken())
    })

    const projects = await fetcher(
      `profiles/get-profile-projects/${fetchedProfile.user.username}`
    )

    if (fetchedProfile.type === 'mentor') {
      const markets = await fetcher(
        `profiles/get-mentor-markets/${fetchedProfile.user.username}`
      )
      setMyProfile({
        ...fetchedProfile,
        projects,
        mentor: { ...fetchedProfile.mentor, markets: markets }
      })
      return
    }

    setMyProfile({ ...fetchedProfile, projects })
  }, [getToken]) // eslint-disable-line

  useEffect(() => {
    if (!isAuthenticated) return

    fetchMyProfile()
  }, [isAuthenticated, fetchMyProfile])

  return (
    <MyProfileContext.Provider
      value={{ myProfile, setMyProfile, refetchMyProfile: fetchMyProfile }}
    >
      {children}
    </MyProfileContext.Provider>
  )
}
