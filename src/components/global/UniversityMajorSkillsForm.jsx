import React, { useMemo } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CheckIcon from '@material-ui/icons/Check'
import Chip from '@material-ui/core/Chip'
import useFetch, { fetcher } from '../../hooks/useFetch'
import AnimateHeight from 'react-animate-height'

export const getStaticProps = async () => {
  const universities = await fetcher('universities/get-universities-name-list')
  const majors = await fetcher('universities/get-majors-name-list')
  const skills = await fetcher('profiles/get-skills-name-list')

  return {
    props: {
      initialUniversities: universities,
      initialMajors: majors,
      initialSkills: skills
    },
    revalidate: 60 * 60 // 1 hour
  }
}

export default function UniversityMajorSkillsForm({
  initialUniversities,
  initialMajors,
  initialSkills,
  isModal = false,
  usePostData
}) {
  const [postData, setPostData] = usePostData()

  const selectedSkillsMatrix = useMemo(() => {
    const matrix = []

    for (let i = 0; i < Math.ceil(postData.skills_names.length / 2); i++) {
      matrix.push(postData.skills_names.slice(i * 2, i * 2 + 2))
    }

    return matrix
  }, [postData.skills_names])

  const { data: universities } = useFetch(
    'universities/get-universities-name-list',
    {
      initialData: initialUniversities
    }
  )

  const { data: majors } = useFetch('universities/get-majors-name-list', {
    initialData: initialMajors
  })

  const { data: skills } = useFetch('profiles/get-skills-name-list', {
    initialData: initialSkills
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!universities || !majors || !skills) {
    return <CircularProgress size={30} className="mb-2" />
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <FormControlLabel
            control={
              <Checkbox
                data-cy="is-attending-university-checkbox"
                className="m-0"
                checked={postData.is_attending_university}
                onChange={() =>
                  setPostData({
                    ...postData,
                    is_attending_university: !postData.is_attending_university
                  })
                }
              />
            }
            label="Sou universitário"
            className={`${isModal ? 'mb-2' : ''}`}
            style={{ width: isModal ? '100%' : 'calc(80% + 1rem)' }}
          />
        </div>
        <AnimateHeight height={postData.is_attending_university ? 'auto' : '0'}>
          <div
            className={`w-full flex justify-center items-center mb-4 ${
              isModal ? 'justify-between' : ''
            }`}
          >
            <FormControl className="w-2/5" style={{ marginRight: '.5rem' }}>
              <InputLabel id="university-input-label">Universidade</InputLabel>
              <Select
                labelId="university-input-label"
                data-cy="university-select"
                value={postData.university_name}
                onChange={handleChange('university_name')}
              >
                {universities.map(university => (
                  <MenuItem key={university.id} value={university.name}>
                    {university.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="w-2/5" style={{ marginLeft: '.5rem' }}>
              <InputLabel id="major-input-label">Curso</InputLabel>
              <Select
                labelId="major-input-label"
                data-cy="major-select"
                value={postData.major_name}
                onChange={handleChange('major_name')}
              >
                {majors.map(major => (
                  <MenuItem key={major.id} value={major.name}>
                    {major.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </AnimateHeight>
      </div>
      <div style={{ width: isModal ? '100%' : 'calc(80% + 1rem)' }}>
        <FormControl className="w-full" style={{ marginBottom: '1rem' }}>
          <InputLabel id="skills-select-label">
            Quais são suas habilidades?
          </InputLabel>
          <Select
            labelId="skills-select-label"
            data-cy="skills-select"
            multiple
            value={postData.skills_names}
            onChange={handleChange('skills_names')}
            renderValue={() => (
              <div>
                {selectedSkillsMatrix.map((skills, index) => (
                  <div key={index} className="mb-1 overflow-x-hidden">
                    {skills.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className="b-primary mr-1"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          >
            {skills.map(skill => (
              <MenuItem
                key={skill.id}
                value={skill.name}
                style={{ paddingLeft: 0 }}
              >
                <div className="w-8 flex justify-center">
                  {postData.skills_names.includes(skill.name) && (
                    <CheckIcon className="icon-sm color-primary" />
                  )}
                </div>
                {skill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  )
}
