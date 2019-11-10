import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles } from '@material-ui/core/styles'

import { TCharacter } from '../../models/Character'

type Props = {
  character: TCharacter
}

const useStyles = makeStyles(() => ({
  characterName: {
    cursor: 'pointer'
  },
  dialogContent: {
    padding: 0
  }
}))

const CharacterDetails: React.FC<Props> = ({ character }) => {
  // init
  const [openDetails, setOpenDetails] = useState(false)

  // styling
  const classes = useStyles()
  
  const handleDetailsOpen = () => {
    setOpenDetails(true)
  }

  const handleDetailsClose = () => {
    setOpenDetails(false)
  }

  return (
    <React.Fragment key={`${character.id}-details`}>
      <Typography gutterBottom className={classes.characterName} variant="h5" component="h2" onClick={handleDetailsOpen}>
        {character.name}
      </Typography>
      <Dialog onClose={handleDetailsClose} aria-labelledby="de-dialog" open={openDetails}>
        <DialogTitle>
          {character.name} - details
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography><strong>Name</strong></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{character.name}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography><strong>Description</strong></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{character.description}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography><strong>Image</strong></Typography>
                </TableCell>
                <TableCell align="center">
                  <img src={character.thumbnail} alt={`${character.name} detail`} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography><strong>Number of occurrences</strong></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{character.comicsCount}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography><strong>First occurrences</strong></Typography>
                </TableCell>
                <TableCell align="center">
                  {character.comics.map((comic) => (<Typography key={`${character.name}-${comic}`}>{comic}</Typography>))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default CharacterDetails