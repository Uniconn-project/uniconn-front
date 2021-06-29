import React from 'react'
import SchoolIcon from '@material-ui/icons/School'

export default function StudentInfo({ profile }) {
  const major = profile.student.major.name
  const formattedMajor = major[0].toUpperCase() + major.slice(1)

  const university = profile.student.university.name

  return (
    <li className="pb-2">
      <SchoolIcon className="icon-sm" /> {formattedMajor} - {university}
    </li>
  )
}
