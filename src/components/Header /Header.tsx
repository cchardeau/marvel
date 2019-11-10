import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  headerContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  headerButton: {
    marginTop: theme.spacing(4)
  }
}))

const Header: React.FC = () => {
  // styling
  const classes = useStyles()

  return (
    <div className={classes.headerContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Marvel app
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Whatever happens tomorrow you must promise me one thing. That you will stay who you are. Not a perfect soldier, but a good man.
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          <i>Captain America</i>
        </Typography>
        <div className={classes.headerButton}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); window.open('https://developer.marvel.com/docs') }}>
                Visit API website
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Header