import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import UserDialog from './UserDialog'
import Button from '@material-ui/core/Button'

const Users = ({ title, ...props }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  return (
    <React.Fragment>
      <UserDialog open={userDialogOpen} setDialogOpen={setUserDialogOpen} />
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
      <div style={{ display: 'flex', marginBottom: 12, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexGrow: 1, alignItems: 'flex-end' }}>
          <Typography variant='subtitle1' style={{ fontWeight: 600 }}>Showing 0 Users</Typography>
        </div>
        <Button style={{ marginRight: 12 }} onClick={() => setUserDialogOpen(true)}>
          New User
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Users
