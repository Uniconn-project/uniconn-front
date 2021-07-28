import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import CheckIcon from '@material-ui/icons/Check'
import useFetch from '../../hooks/useFetch'

export default function ProjectBaseForm({ usePostData }) {
  const [postData, setPostData] = usePostData()

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: fields } = useFetch('projects/get-fields-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleDeleteField = marketName => {
    setPostData({
      ...postData,
      fields: postData.fields.filter(market => market !== marketName)
    })
  }

  if (!categories || !fields) {
    return (
      <div className="flex justify-content">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <TextField
          className="w-5/12"
          label="Nome"
          value={postData.name}
          inputProps={{ maxLength: 50 }}
          onChange={handleChange('name')}
        />
        <FormControl className="w-5/12">
          <InputLabel id="category-select-label">Categoria</InputLabel>
          <Select
            labelId="category-select-label"
            value={postData.category}
            onChange={handleChange('category')}
          >
            {categories.map(category => (
              <MenuItem key={category.value} value={category.value}>
                {category.readable[0].toUpperCase()}
                {category.readable.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full mb-2">
        <FormControl className="w-full">
          <InputLabel id="fields-select-label">Áreas de atuação</InputLabel>
          <Select
            labelId="fields-select-label"
            value={postData.fields}
            multiple
            onChange={handleChange('fields')}
            renderValue={selected => (
              <div className="overflow-x-auto">
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    className="b-primary mr-1"
                    onMouseDown={e => e.stopPropagation()}
                    onDelete={() => handleDeleteField(value)}
                  />
                ))}
              </div>
            )}
          >
            {fields.map(field => (
              <MenuItem key={field.id} value={field.name}>
                <div className="w-8 flex justify-center">
                  {postData.field.includes(field.name) && (
                    <CheckIcon className="icon-sm color-primary" />
                  )}
                </div>
                {field.name[0].toUpperCase()}
                {field.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full mb-2">
        <TextField
          className="w-full"
          label="Slogan"
          helperText="Frase descrevendo seu projeto"
          value={postData.slogan}
          inputProps={{ maxLength: 125 }}
          multiline
          onChange={handleChange('slogan')}
        />
      </div>
    </>
  )
}
