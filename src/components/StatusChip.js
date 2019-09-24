import React from 'react'
import Chip from '@material-ui/core/Chip'

const StatusChip = ({ status, label }) => {
  const myLabel = label || status
  return (
    <>
      {(status === 'Won') ? (
        <Chip size='small' color='primary' style={{ marginRight: 6, marginBottom: 6 }} label={myLabel} />
      ) : (status === 'Pending') ? (
        <Chip size='small' color='secondary' style={{ marginRight: 6, marginBottom: 6 }} label={myLabel} />
      ) : (status === 'Lost') ? (
        <Chip size='small' style={{ backgroundColor: 'red', color: 'white', marginRight: 6, marginBottom: 6 }} label={myLabel} />
      ) : (status === 'Open') ? (
        <Chip size='small' style={{ backgroundColor: '#388e3c', color: 'white', marginRight: 6, marginBottom: 6 }} label={myLabel} />
      ) : (
        <Chip size='small' label={myLabel} />
      )}
    </>
  )
}

export default StatusChip
