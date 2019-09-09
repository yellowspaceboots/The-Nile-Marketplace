import React, { useState } from 'react'
import LogDialog from './LogDialog'
import SalesDialog from './SalesDialog'
import Button from '@material-ui/core/Button'
import EventCard from './EventCard'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CircularProgress from '@material-ui/core/CircularProgress'
import FilterListIcon from '@material-ui/icons/FilterList'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import salesmen from './salesmen'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

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

const RequestLog = ({ title }) => {
  // const [view, switchView] = useState(false)
  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [filter, toggleFilter] = useState(false)
  const [salesDialogOpen, setSalesDialogOpen] = useState(false)
  const { loading, data, error } = useQuery(GET_REQUESTS)
  if (loading) { return <CircularProgress /> }
  if (error) { return <div>Error! {error.message}</div> }
  const getRequests = data.getRequests
  return (
    <React.Fragment>
      <LogDialog open={logDialogOpen} setDialogOpen={setLogDialogOpen} addEvent={() => console.log('placeholder')} />
      <SalesDialog open={salesDialogOpen} setDialogOpen={setSalesDialogOpen} />
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
      <div style={{ display: 'flex', marginBottom: 12, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexGrow: 1, alignItems: 'flex-end' }}>
          <Typography variant='subtitle1' style={{ fontWeight: 600 }}>Showing {getRequests.length} Projects</Typography>
        </div>
        <Button style={{ marginRight: 12 }} onClick={() => setLogDialogOpen(true)}>
          New Request
        </Button>
        <Button onClick={() => toggleFilter(!filter)}>
        Filter
          <FilterListIcon style={{ marginLeft: 4 }} />
        </Button>
      </div>
      <Collapse in={filter}>
        <div style={{ height: 200, marginBottom: 12, overflowX: 'hidden' }}>
          <List dense subheader={<ListSubheader>Salesmen</ListSubheader>}>
            {salesmen.map(salesman =>
              <ListItem button key={salesman.number}>
                <ListItemText
                  primary={salesman.name}
                />
              </ListItem>
            )}
          </List>
        </div>
        <Divider style={{ marginBottom: 12 }} />
      </Collapse>
      <Grid container spacing={2}>
        {getRequests.map(event => <EventCard key={event._id} event={event} setLogDialogOpen={setLogDialogOpen} />)}
      </Grid>
    </React.Fragment>
  )
}

export default RequestLog
