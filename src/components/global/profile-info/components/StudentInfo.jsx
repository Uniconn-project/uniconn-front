import React from 'react'
import SchoolIcon from '@material-ui/icons/School'

export default function StudentInfo({ profile }) {
  const major = profile.student.major.name

  return (
    <li className="pb-2">
      <SchoolIcon className="icon-sm" />{' '}
      {major[0].toUpperCase() + major.slice(1)}
      {' - '}
      {profile.student.university.name}
    </li>
  )
}
