import React, { useEffect, useState } from 'react'

export default function ProfilesFilter({ profiles, setProfiles }) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!profiles) return

    setProfiles(
      profiles.filter(profile =>
        profile.user.username.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, profiles, setProfiles])

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          className="bg-transparent p-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
