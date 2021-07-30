import Link from 'next/link'
import React from 'react'

export default function ProjectCategory({ category }) {
  return (
    <Link href={`/projects/${category.value}`}>
      <div className={`text-md px-2 w-max color-${category.value}`}>
        {category.readable}
      </div>
    </Link>
  )
}
