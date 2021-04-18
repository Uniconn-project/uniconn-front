import useSWR from 'swr'

export default function useFetch(url) {
  const { data, err, mutate } = useSWR(url, async url => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
    const data = await response.json()
    return data
  })

  return { data, err, mutate }
}
