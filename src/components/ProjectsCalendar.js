import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_REQUESTS = gql`
  query getRequestsQuery {
    getRequests {
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
const localizer = momentLocalizer(moment)

const ProjectsCalendar = props => {
  const { loading, data: { getRequests }, error } = useQuery(GET_REQUESTS)
  if (error) { return <div>Error! {error.message}</div> }
  if (loading) { return <CircularProgress /> }
  const requestsWithDate = getRequests.map(event => ({ ...event, end: new Date(event.end), title: `Bid due for ${event.title}` }))
  return (
    <React.Fragment>
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {props.title}
      </Typography>
      <div style={{ height: '85%' }}>
        <Calendar
          localizer={localizer}
          events={requestsWithDate}
          startAccessor='end'
          endAccessor='end'
        />
      </div>
    </React.Fragment>
  )
}

export default ProjectsCalendar
