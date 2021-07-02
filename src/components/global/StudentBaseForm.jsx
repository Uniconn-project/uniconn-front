import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Page from '../../components/Page'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getStaticProps = async () => {
  const universities = await fetcher('universities/get-universities-name-list')
  const majors = await fetcher('universities/get-majors-name-list')

  return {
    props: {
      universities,
      majors
    },
    revalidate: 60 * 60 // 1 hour
  }
}

export default function StudentBaseForm(props) {
  const [postData, setPostData] = props.usePostData()

  const { data: universities } = useFetch(
    'universities/get-universities-name-list',
    {
      initialData: props.universities
    }
  )

  const { data: majors } = useFetch('universities/get-majors-name-list', {
    initialData: props.majors
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!universities || !majors) {
    return (
      <Page title="Signup | Uniconn">
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <div
      className={`w-full flex justify-center items-center mb-4 ${
        props.className ? props.className : ''
      }`}
    >
      <FormControl className="w-2/5" style={{ marginRight: '.5rem' }}>
        <InputLabel id="university-input-label">Universidade</InputLabel>
        <Select
          labelId="university-input-label"
          value={postData.university}
          onChange={handleChange('university')}
        >
          {universities.map(university => (
            <MenuItem key={university.id} value={university.name}>
              {university.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-2/5" style={{ marginLeft: '0.5rem' }}>
        <InputLabel id="major-input-label">Curso</InputLabel>
        <Select
          labelId="major-input-label"
          value={postData.major}
          onChange={handleChange('major')}
        >
          {majors.map(major => (
            <MenuItem key={major.id} value={major.name}>
              {major.name[0].toUpperCase()}
              {major.name.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
