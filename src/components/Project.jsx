import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

export default function Project({ image, name }) {
  return (
    <Card>
      <CardContent className="flex w-full justify-between">
        <h1 className="text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ut nulla a voluptatem beatae iure culpa</h1>
        <Button variant="contained" color="primary">
          Entrar
        </Button>
      </CardContent>
    </Card>
  )
}
