import React from 'react'
import Chip from '@material-ui/core/Chip'

const StatusChip = ({ status }) => {
  return (
    <React.Fragment>
      {(status === 'Won') ? (
        <Chip size='small' color='primary' label={status} />
      ) : (status === 'Pending') ? (
        <Chip size='small' color='secondary' label={status} />
      ) : (status === 'Lost') ? (
        <Chip size='small' style={{ backgroundColor: 'red', color: 'white' }} label={status} />
      ) : (status === 'Open') ? (
        <Chip size='small' style={{ backgroundColor: 'green', color: 'white' }} label={status} />
      ) : (
        <Chip size='small' label={status} />
      )}
    </React.Fragment>
  )
}

export default StatusChip
