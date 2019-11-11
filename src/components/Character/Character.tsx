import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CharacterDetails from '../CharacterDetails/CharacterDetails'
import { TCharacter } from '../../models/Character'

type Props = {
  character: TCharacter
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}))

const Character: React.FC<Props> = ({ character }) => {
  // init
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const sendRequest = useCallback(async () => {
    const { REACT_APP_FAVORITE_URL } = process.env
    if (!REACT_APP_FAVORITE_URL) {
      throw new Error('missing .env variables')
    }

    // don't send again while we are sending
    if (isSending) return

    // disable favorite button
    setIsSending(true)

    // send the actual request
    const response = await axios.post(`${REACT_APP_FAVORITE_URL}/favorite`, { favoriteId: character.id })
    const favoriteId = response && response.data ? response.data.favoriteId : []
    const isFavorite = Boolean(favoriteId.includes(character.id))

    // set favorite
    setIsFavorite(isFavorite)

    // re-enable favorite button
    setIsSending(false)
  }, [isSending, character]) // update the callback if the state changes

  // init character isFavorite
  useEffect(() => {
    setIsFavorite(character.isFavorite)
  }, [character])

  // styling
  const classes = useStyles()

  return (
    <React.Fragment key={character.id}>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={character.thumbnail}
            title={`${character.name} image`}
          />
          <CardContent className={classes.cardContent}>
            <CharacterDetails character={character} />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" disabled={isSending} onClick={sendRequest}>
              { isFavorite ? 'Remove from favorite' : 'Set as favorite' }
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default Character