import React, { useContext } from 'react'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EditProjectDataModal from './EditProjectDataModal'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProjectInfo({ project, setPage, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

  return (
    <div className="relative bg-transparent h-4/5 rounded-md shadow-lg w-full md:max-w-2xl lg:w-60">
      <div className="b-bottom-light pb-6">
        <div className="w-full flex justify-center p-2">
          <img
            src={process.env.NEXT_PUBLIC_API_HOST + project.image}
            className="w-full h-52 rounded-md object-cover"
          />
        </div>
        <div className="w-full pl-4 break-words">
          <h3 className="mt-2">{project.name}</h3>
        </div>
      </div>
      <div className="w-full pl-4 pr-2 py-6 b-bottom-light">
        <p className="break-words">{project.slogan}</p>
        <p className={`mt-2 font-bold color-${project.category.value}`}>
          {project.category.readable}
        </p>
      </div>
      <div className="w-full pl-4 pr-1 pt-6 pb-2">
        <ul>
          <li className="mb-2">
            <SchoolIcon className="color-primary" />{' '}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setPage('students')}
            >
              <strong>{project.students.length}</strong>{' '}
              {project.students.length === 1
                ? 'universitário'
                : 'universitários'}
            </span>
          </li>
          <li className="mb-2">
            <AssignmentIcon className="color-secondary" />{' '}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setPage('mentors')}
            >
              <strong>{project.mentors.length}</strong>{' '}
              {project.mentors.length === 1 ? 'mentor' : 'mentores'}
            </span>
          </li>
        </ul>
      </div>
      {project.students.map(profile => profile.id).includes(myProfile.id) && (
        <EditProjectDataModal
          project={project}
          refetchProject={refetchProject}
        />
      )}
    </div>
  )
}
