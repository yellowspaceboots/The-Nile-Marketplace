import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'
import { accountsGraphQL } from '../client'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

const UserDialog = ({ fullScreen, open, setDialogOpen }) => {
  const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }
  const [values, setValues] = useState(initialState)
  const [creatingUser, setCreatingUser] = useState(false)
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const [mutationError, setMutationError] = useState('')
  const handleClose = () => {
    setCreatingUser(false)
    setMutationError(null)
    setDialogOpen(false)
  }
  const createUser = async () => {
    setCreatingUser(true)
    try {
      await accountsGraphQL.createUser({
        email: values.email,
        password: values.password,
        profile: {
          firstName: values.firstName,
          lastName: values.lastName,
          type: 'EMPLOYEE',
          roles: [
            {
              group: 'default',
              role: 'default'
            }
          ]
        }
      })
      handleClose()
    } catch (err) {
      setCreatingUser(false)
      setMutationError(err.message)
    }
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      {creatingUser && <LinearProgress color='secondary' style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />}
      <DialogTitle id='responsive-dialog-title'>{'Add New User'}</DialogTitle>
      <DialogContent>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          onChange={handleChange('email')}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handleChange('password')}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='firstName'
          label='First Name'
          id='firstName'
          onChange={handleChange('firstName')}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='lastName'
          label='Last Name'
          id='lastName'
          onChange={handleChange('lastName')}
        />
        {mutationError && <Typography color='error'>{mutationError.split(' error: ')[1]}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={() => createUser()}>
            Submit
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog()(UserDialog)
