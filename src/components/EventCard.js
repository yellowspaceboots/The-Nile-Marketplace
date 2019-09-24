import React from 'react'
import Card from '@material-ui/core/Card'
// import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
// import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import StatusChip from './StatusChip'
import { Link } from 'react-router-dom'
import { safelyGetNestedValue } from './utils'
// import IconButton from '@material-ui/core/IconButton'
// import EditIcon from '@material-ui/icons/Edit'

const EventCard = ({ event, salesmen }) => {
  const renderLink = React.forwardRef((itemProps, ref) => <Link to={`/commercial-projects/request-log/${event._id}`} {...itemProps} ref={ref} />)
  // const initials = event.salesman.split(' ').map((n) => n[0]).join('')
  const statusColor = event.status === 'Open' ? '#388e3c' : event.status === 'Pending' ? '#ffbb41' : event.status === 'Won' ? '#1e3f76' : 'red'
  const idDigitCount = 6
  const requestId = event.requestId.length < idDigitCount ? `${'0'.repeat(idDigitCount - event.requestId.length)}${event.requestId}` : event.requestId
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card style={{ height: '100%', position: 'relative', overflow: 'visible', minHeight: 140 }}>
      <CardActionArea component={renderLink} style={{ height: '100%' }}>
          <CardHeader
            action={
              <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant='overline' align='right' style={{ color: statusColor, flexGrow: 1, fontWeight: 900 }}>
                  {event.status}
                </Typography>
                <div style={{ display: 'flex'}}>
                  <div style={{ flexGrow: 1}} />
                  <Divider style={{ padding: 2, backgroundColor: statusColor, marginTop: -4, marginBottom: 4, width: 80 }} />
                </div>
                <NumberFormat
                  value={event.amount / 100}
                  displayType={'text'}
                  thousandSeparator
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={'$'}
                  renderText={
                  value => (
                    <Typography align='right' variant='subtitle1'>
                      {value}
                    </Typography>
                  )}
                />
                <Typography variant='subtitle1' align='right' noWrap style={{ marginTop: -4, marginBottom: -4 }}>{event.salesman}</Typography>
                <Typography variant='h6' noWrap align='right' style={{ fontWeight: 900 }}>{moment(event.end).format('h:mm A')}</Typography>
              </div>
            }
            title={
                <Typography variant='subtitle1' aria-label='title'>
                  {event.title}
                </Typography>
            }
          />
          <CardContent style={{ paddingTop: 0 }}>
            <div>
            <Typography variant='body2' color='textSecondary' component='p'>
                {`request#: ${requestId}`}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
          Added {moment(event.start).fromNow()}
              </Typography>
              <Typography variant='h6'>
          Due {moment(event.end).fromNow()}
              </Typography>
            </div>
            <div style={{ display: 'flex', marginTop: 8 }}>
              <div style={{ flexGrow: 1 }}>
                {event.customers.map(customer => {
                  const salesmanArr = salesmen.filter(salesman => salesman.number === customer.salesmanNumber)
                  const salesman = safelyGetNestedValue([0, 'name'], salesmanArr)
                  return (
                  <StatusChip
                    label={customer.name + ' - ' + salesman}
                    status={event.status}
                    style={{ marginRight: 6, marginBottom: 6 }}
                  />
                )})}
              </div>
            </div>
          </CardContent>        
      </CardActionArea>

      </Card>
    </Grid>
  )
}

export default EventCard
