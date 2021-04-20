import useSWR from 'swr'

export const fetcher = async url => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${url}`)
  const data = await response.json()
  return data
}

export default function useFetch(url, config) {
  const { data, err, mutate } = useSWR(url, fetcher, config)

  return { data, err, mutate }
}
