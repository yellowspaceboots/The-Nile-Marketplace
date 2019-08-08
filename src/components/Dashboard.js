import React from 'react'
import Typography from '@material-ui/core/Typography'

const Dashboard = ({ title, ...props }) => {
  return (
    <React.Fragment>
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
    </React.Fragment>
  )
}

export default Dashboard
