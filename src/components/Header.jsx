import React from 'react'

export default function Header({ page }) {
  return (
    <div>
      <span className='text-white text-2xl'>{page}</span>
    </div>
  )
}
