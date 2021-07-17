import React from 'react'
import PaletteIcon from '@material-ui/icons/Palette'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import SchoolIcon from '@material-ui/icons/School'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

export default function StudentInfo({ profile }) {
  const major = profile.student.major.name
  const formattedMajor = major[0].toUpperCase() + major.slice(1)

  const university = profile.student.university.name

  return (
    <>
      <li className="pb-2">
        <SchoolIcon className="icon-sm" /> {formattedMajor} - {university}
      </li>
      {profile.linkedIn && (
        <li className="pb-2 break-all">
          <a
            href={`https://www.linkedin.com/in/${profile.linkedIn}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="color-paragraph hover:underline">
              <LinkedInIcon className="icon-sm" /> {profile.linkedIn}
            </div>
          </a>
        </li>
      )}
      <li className="pb-2">
        <div className="w-full flex items-center mb-1">
          <span>
            <PaletteIcon className="icon-sm" /> Habilidades:
          </span>
        </div>
        <ul className="max-h-24 overflow-y-auto">
          {profile.student.skills.map(skill => (
            <li key={skill.id}>
              <ArrowRightAltIcon className="color-primary icon-sm" />{' '}
              {skill.name}
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}
