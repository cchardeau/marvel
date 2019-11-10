import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

const Footer: React.FC = () => {
  // styling
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Corentin Chardeau
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Peaks @ 2019
      </Typography>
    </footer>
  )
}

export default Footer