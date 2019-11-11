import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
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
  paginationGrid: {
    paddingTop: theme.spacing(8)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: theme.spacing(120)
  }
}))

const toCharacter = (entity: any, favoriteId: ReadonlyArray<number>): TCharacter => ({
  id: entity.id,
  name: entity.name,
  thumbnail: `${entity.thumbnail.path}/landscape_amazing.${entity.thumbnail.extension}`,
  description: entity.description,
  comicsCount: entity.comics.available,
  comics: entity.comics.items.slice(0, 3).map((comic: any) => comic.name),
  isFavorite: Boolean(favoriteId.includes(entity.id))
})

const App: React.FC = () => {
  // init
  const [data, setData] = useState({ characters: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(100)
  
  // styling
  const classes = useStyles()

  // fetch characters on mount
  useEffect(() => {
    const { REACT_APP_MARVEL_URL, REACT_APP_MARVEL_KEY, REACT_APP_FAVORITE_URL } = process.env
    if (!REACT_APP_MARVEL_URL || !REACT_APP_MARVEL_KEY || !REACT_APP_FAVORITE_URL) {
      throw new Error('missing .env variables')
    }

    const fetchData = async () => {
      // display loader
      setIsLoading(true)

      // get characters from Marvel API
      const response = await axios.get(`${REACT_APP_MARVEL_URL}/characters`, {
        params: {
          apikey: REACT_APP_MARVEL_KEY,
          limit: 20,
          offset
        }
      })

      const { data: { results } } = response.data
      if (response.statusText === 'OK' && results) {
        // when everything is OK, get favorites for the current user
        const favoriteResponse = await axios.get(`${REACT_APP_FAVORITE_URL}/favorite`)
        const favoriteId = favoriteResponse && favoriteResponse.data ? favoriteResponse.data.favoriteId : []

        // update characters
        setData({ characters: results.map((entity: any) => toCharacter(entity, favoriteId)) })

        // hide loader
        setIsLoading(false)
      }
    }

    fetchData()
  }, [offset])

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Navbar />
      <main>
        <Header />
        <Container className={classes.paginationGrid} maxWidth="md">
          <Grid container justify="center">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button disabled={offset < 20} onClick={(event => { event.preventDefault(); setOffset(offset - 20) })}>
                Previous
              </Button>
              <Button disabled={offset > 1460} onClick={(event => { event.preventDefault(); setOffset(offset + 20) })}>
                Next
              </Button>
            </ButtonGroup>
          </Grid>
        </Container>
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
