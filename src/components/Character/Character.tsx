import React from 'react'
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
            <Button size="small" color="primary">
              Set as favorite
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default Character