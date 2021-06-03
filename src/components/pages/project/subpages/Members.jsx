import React from 'react'
import ProfileListItem from '../../../global/ProfileListItem'

export default function Members({ profiles }) {
  return (
    <div className="w-full p-4 pt-0">
      <div>
        {profiles.map(profile => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}
