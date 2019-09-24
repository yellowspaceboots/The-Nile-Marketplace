import React from 'react'
import Typography from '@material-ui/core/Typography'

const MaterialStatus = ({ title, ...props }) => {
  return (
    <>
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
    </>
  )
}

export default MaterialStatus
