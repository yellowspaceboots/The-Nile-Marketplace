import React, { useState } from 'react'
import LogDialog from './LogDialog'
import SalesDialog from './SalesDialog'
import Button from '@material-ui/core/Button'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventCard from './EventCard'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import StatusChip from './StatusChip'
import TextField from '@material-ui/core/TextField'
import initialState from './requests'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_REQUESTS = gql`
  query getRequestsQuery {
    getRequests {
      id
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

/*
const localizer = BigCalendar.momentLocalizer(moment)

const MyCalendar = props => (
  <div style={{ width: '75vh', height: '75vh' }}>
    <BigCalendar
      localizer={localizer}
      events={props.events}
      startAccessor='start'
      endAccessor='end'
    />
  </div>
)
*/
const RequestLog = ({ title }) => {
  // const [view, switchView] = useState(false)
  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [salesDialogOpen, setSalesDialogOpen] = useState(false)

  const [events, setEvents] = useState(initialState)
  const [editId, setEditId] = useState()
  const addEvent = (event) => {
    setEvents([
      ...events,
      {
        id: events.length,
        title: event.project,
        start: event.received,
        end: event.due,
        salesman: event.salesman,
        amount: event.amount,
        customers: [event.customer]
      }
    ])
  }
  const [status, setStatus] = useState([])
  function handleChange (event) {
    setStatus(event.target.value)
  }
  const statuses = [
    'Open',
    'Pending',
    'Won',
    'Lost'
  ]
  const { loading, data: { getRequests }, error } = useQuery(GET_REQUESTS)
  if (error) { return <div>Error! {error.message}</div> }
  if (loading) { return <CircularProgress /> }
  return (
    <React.Fragment>
      <LogDialog open={logDialogOpen} setDialogOpen={setLogDialogOpen} addEvent={addEvent} edit={editId || events.filter(event => event.id === editId)[0]} />
      <SalesDialog open={salesDialogOpen} setDialogOpen={setSalesDialogOpen} />
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
      {/*
      <Button onClick={() => switchView(!view)} color='primary' style={{ marginBottom: 10 }}>
        {view ? 'View List' : 'View Calendar'}
      </Button>
      */}
      <div style={{ display: 'flex', marginBottom: 12, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexGrow: 1, alignItems: 'flex-end' }}>
          <Typography variant='h6'>Showing {events.length} Projects</Typography>
          <Button variant='outlined' style={{ marginLeft: 12 }} onClick={() => setLogDialogOpen(true)}>
          + New Request
          </Button>
        </div>
        <TextField
          id='standard-name'
          label='Name'
        />
        <FormControl style={{ minWidth: 100, marginLeft: 10 }}>
          <InputLabel htmlFor='select-multiple-chip'>Status</InputLabel>
          <Select
            multiple
            value={status}
            onChange={handleChange}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <StatusChip key={value} status={value} />
                ))}
              </div>
            )}
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {getRequests.map(event => <EventCard key={event.id} event={event} setEditId={setEditId} setLogDialogOpen={setLogDialogOpen} />)}
      </Grid>
      {
        /*
        !view ? (
        <Grid container spacing={2} justify='stretch'>
          {events.map(event => <EventCard key={event.id} event={event} setEditId={setEditId} setLogDialogOpen={setLogDialogOpen} />)}
        </Grid>
      ) : (
        <MyCalendar events={events} />
      )
      */
      }
    </React.Fragment>
  )
}

export default RequestLog
