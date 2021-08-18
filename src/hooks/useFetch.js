import useSWR from 'swr'

export const fetcher = async (route, headers = {}, ssr) => {
  const apiURL = ssr ? process.env.NEXT_PUBLIC_DOCKER_API_URL : process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${apiURL}/api/${route}`, { headers: headers })
  const data = await response.json()
  return data
}

export default function useFetch(url, config = {}) {
  const { data, err, mutate } = useSWR(url, fetcher, config)

  return { data, err, mutate }
}
