import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Page from '../../components/Page'
import ProfileBaseForm from '../../components/pages/signup/ProfileBaseForm'
import useFetch from '../../hooks/useFetch'

export default function Student() {
  const [errMessage, setErrMessage] = useState(null)
  const [postData, setPostData] = useState({
    university: '',
    major: ''
  })
  const [profilePostData, setProfilePostData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birth_date: '',
    password: '',
    passwordc: ''
  })

  const { data: universities } = useFetch(
    'universities/get-universities-name-list'
  )

  const { data: majors } = useFetch('universities/get-majors-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleProfileDataChange = (key, value) => {
    setProfilePostData({ ...profilePostData, [key]: value })
  }

  const handleSubmit = () => {
    let error = false

    const valuesInput = Object.values({ ...postData, ...profilePostData })

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrMessage('Todos os campos devem ser preenchidos!')
        break
      }
    }

    if (error) return

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/student/post-signup`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ ...profilePostData, ...postData })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          process.env.NODE_ENV === 'development' && console.log(data)
        } else {
          setErrMessage(data)
        }
      })
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
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <h1>Aluno</h1>
        {errMessage !== null && (
          <div>
            <Alert severity="error">{errMessage}</Alert>
          </div>
        )}
        <div className="flex flex-col items-center my-4">
          <ProfileBaseForm handleChange={handleProfileDataChange} />
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
        </div>
        <Button
          variant="contained"
          color="primary"
          className="w-4/5"
          onClick={handleSubmit}
        >
          Criar conta
        </Button>
        <IconButton color="primary" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
    </Page>
  )
}
