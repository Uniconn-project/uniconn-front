import useSWR from 'swr'

export default function useFetch(url) {
  const { data, err, mutate } = useSWR(url, async url => {
    const response = await fetch(`http://127.0.0.1:8000/${url}`)
    const data = await response.json()
    return data
  })

  return { data, err, mutate }
}
