import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Page from '../../components/Page'
import BaseForm from '../../components/pages/signup/BaseForm'
import { AuthContext } from '../../contexts/Auth'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getStaticProps = async () => {
  const universities = await fetcher('universities/get-universities-name-list')
  const majors = await fetcher('universities/get-majors-name-list')

  return {
    props: {
      universities,
      majors
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}

export default function Student(props) {
  const [postData, setPostData] = useState({
    university: '',
    major: ''
  })

  const router = useRouter()

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) router.push('/')

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
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center">
        <h1>Aluno</h1>
        <BaseForm parentPostData={postData} type="student">
          <FormGroup className="w-full mb-4 justify-center items-center" row>
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
          </FormGroup>
        </BaseForm>
      </div>
    </Page>
  )
}
