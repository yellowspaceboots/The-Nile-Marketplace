import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const type = ['Inside', 'Outside']

const SalesDialog = ({ fullScreen, open, setDialogOpen }) => {
  const [values, setValues] = useState({
    name: '',
    number: '',
    type: ''
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => setDialogOpen(false)}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>{'Add New Salesman'}</DialogTitle>
      <DialogContent>
        <TextField
          id='outlined-name'
          autoComplete='off'
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
          margin='normal'
          fullWidth
          variant='outlined'
        />
        <TextField
          id='outlined-name'
          autoComplete='off'
          label='Sales Number'
          value={values.number}
          onChange={handleChange('number')}
          margin='normal'
          fullWidth
          variant='outlined'
        />
        <TextField
          id='outlined-select-currency'
          select
          label='Type'
          fullWidth
          value={values.type}
          onChange={handleChange('type')}
          margin='normal'
          variant='outlined'
        >
          {type.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color='primary'>
            Submit
        </Button>
        <Button onClick={() => setDialogOpen(false)} color='primary' autoFocus>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog()(SalesDialog)
