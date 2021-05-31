import React, { useEffect, useState } from 'react'
import { fetcher } from '../../../hooks/useFetch'

export default function ProfilesFilter({ profiles, setProfiles }) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!profiles) return
    if (!search.trim().length) {
      setProfiles([])
      return
    }

    ;(async () => {
      const data = await fetcher(`profiles/get-filtered-profiles/${search}`)
      setProfiles(data)
    })()
  }, [search]) // eslint-disable-line

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          className="bg-transparent p-2"
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  )
}
