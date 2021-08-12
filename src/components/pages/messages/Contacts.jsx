import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'

export default function Contacts() {
  const [contactSearch, setContactSearch] = useState('')

  return (
    <div
      className="relative bg-transparent rounded-md shadow-lg pt-4 w-full md:max-w-2xl lg:w-60"
      style={{ height: '70vh', maxHeight: '50rem' }}
    >
      <div className="flex items-center p-2 b-bottom-light">
        <SearchIcon className="icon-sm mr-1" />
        <input
          type="text"
          className="bg-none w-full"
          placeholder="Pesquisar conversa"
          value={contactSearch}
          onChange={e => setContactSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
