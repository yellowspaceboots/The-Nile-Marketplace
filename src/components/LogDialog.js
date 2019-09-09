import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers'
import salesmen from './salesmen'
import customers from './customers'
import NumberFormat from 'react-number-format'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import MultiSelect from './MultiSelect'

const ADD_EVENT = gql`
  mutation AddEvent($event: EventInput!) {
    addEvent(event: $event) {
      _id
      requestId
      title
      start
      end
      salesman
      amount
      status
      customers
    }
  }
`

const size = ['Large', 'Medium', 'Small']

const status = ['Pending', 'Open', 'Won', 'Lost']

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      thousandSeparator
      prefix='$'
    />
  )
}

const LogDialog = ({ fullScreen, open, setDialogOpen, event }) => {
  const initialValuesState = event || {
    title: '',
    customers: null,
    amount: '',
    size: '',
    status: '',
    salesman: ''
  }
  const initialDateState = {
    start: new Date(),
    end: new Date()
  }
  const [values, setValues] = useState(initialValuesState)
  const [dateValues, setDateValues] = useState(initialDateState)
  const [multi, setMulti] = useState(null)

  function handleChangeMulti (value) {
    setMulti(value)
  }
  const resetFormState = () => {
    setValues(initialValuesState)
    setDateValues(initialDateState)
    setMulti(null)
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const handleDateChange = (name, value) => {
    setDateValues({ ...dateValues, [name]: value })
  }
  const [addEvent, { data }] = useMutation(ADD_EVENT, {
    refetchQueries: ['getRequestsQuery']
  })
  const customerNoKeyAccount = customers.filter(customer => customer.keyAccountId === 'UNDEFINED')
  const customerByKeyAccount = new Set(customers.filter(customer => customer.keyAccountId !== 'UNDEFINED').map(customer => customer.keyAccountId))
  const keyAccounts = [...customerByKeyAccount].map(keyAccountId => {
    const myCustomer = customers.filter(customer => customer.keyAccountId === keyAccountId)[0]
    return myCustomer
  })
  const finalCustomerList = [...customerNoKeyAccount, ...keyAccounts].sort((a, b) => a.name.localeCompare(b.name))
  const finalCustomerListForSelect = finalCustomerList.map(customer => ({
    ...customer,
    value: customer.account,
    label: customer.name
  }))
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => setDialogOpen(false)}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>{'Log a New Incoming Request'}</DialogTitle>
      <DialogContent>
        <TextField
          id='outlined-name'
          autoComplete='off'
          label='Project Name'
          value={values.title}
          onChange={handleChange('title')}
          margin='normal'
          fullWidth
          variant='outlined'
        />
        <MultiSelect
          label='Customers'
          suggestions={finalCustomerListForSelect}
          multi={multi}
          handleChangeMulti={handleChangeMulti}
        />
        <TextField
          id='outlined-select-currency'
          select
          label='Inside Salesman'
          fullWidth
          value={values.salesman}
          onChange={handleChange('salesman')}
          margin='normal'
          variant='outlined'
        >
          {salesmen.filter(salesman => salesman.type === 'Inside').map(option => (
            <MenuItem key={option.number} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <KeyboardDatePicker
          label='Date Received'
          style={{ marginRight: 10 }}
          value={dateValues.received}
          animateYearScrolling
          inputVariant='outlined'
          margin='normal'
          onChange={date => handleDateChange('start', date)}
          format='ll'
        />
        <KeyboardDateTimePicker
          label='Date Due'
          inputVariant='outlined'
          animateYearScrolling
          value={dateValues.due}
          onChange={date => handleDateChange('end', date)}
          showTodayButton
          disablePast
          format='lll'
          margin='normal'
        />
        <TextField
          id='outlined-adornment-amount'
          variant='outlined'
          autoComplete='off'
          label='Amount'
          value={values.amount}
          onChange={handleChange('amount')}
          margin='normal'
          fullWidth
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
        />
        <TextField
          id='outlined-select-currency'
          select
          label='Project Size'
          fullWidth
          value={values.size}
          onChange={handleChange('size')}
          margin='normal'
          variant='outlined'
        >
          {size.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-select-currency'
          select
          label='Project Status'
          fullWidth
          value={values.status}
          onChange={handleChange('status')}
          margin='normal'
          variant='outlined'
        >
          {status.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary' autoFocus
          onClick={() => {
            addEvent({
              variables: {
                event: {
                  ...values,
                  ...dateValues,
                  amount: parseInt(parseFloat(values.amount) * 100),
                  customers: multi.map(customer => customer.name)
                }
              } })
            resetFormState()
            setDialogOpen(false)
          }}
        >
            Submit
        </Button>
        <Button
          onClick={() => {
            resetFormState()
            setDialogOpen(false)
          }}
          color='primary'>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

LogDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
}

export default withMobileDialog()(LogDialog)
