import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Character from '../Character/Character'
import Navbar from '../Navbar/Navbar'
import Header from '../Header /Header'
import Footer from '../Footer/Footer'
import { TCharacter } from '../../models/Character'

const useStyles = makeStyles(theme => ({
  app: {
    textAlign: 'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: theme.spacing(120)
  }
}))

const toCharacter = (entity: any): TCharacter => ({
  id: entity.id,
  name: entity.name,
  thumbnail: `${entity.thumbnail.path}/landscape_amazing.${entity.thumbnail.extension}`,
  description: entity.description,
  comicsCount: entity.comics.available,
  comics: entity.comics.items.slice(0, 3).map((comic: any) => comic.name)
})

const App: React.FC = () => {
  // init
  const [data, setData] = useState({ characters: [] })
  const [isLoading, setIsLoading] = useState(false)
  
  // styling
  const classes = useStyles()

  // fetch characters on mount
  useEffect(() => {
    const { REACT_APP_MARVEL_URL, REACT_APP_MARVEL_KEY } = process.env
    if (!REACT_APP_MARVEL_URL || !REACT_APP_MARVEL_KEY) {
      throw new Error('missing .env variables')
    }

    setIsLoading(true)
    axios.get(`${REACT_APP_MARVEL_URL}/characters`, {
      params: {
        apikey: REACT_APP_MARVEL_KEY,
        limit: 20,
        offset: 100
      }
    })
    .then((response: any) => {
      const { data: { results } } = response.data
      if (response.statusText === 'OK' && results) {
        setData({ characters: results.map(toCharacter) })
        setIsLoading(false)
      }
    })
    .catch((err: any) => console.error(err))
  }, [])

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Navbar />
      <main>
        <Header />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justify="center"> 
            { isLoading ? <CircularProgress /> : data.characters.map((character: TCharacter) => (<Character character={character} key={character.id} />)) }
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
