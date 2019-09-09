import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import StatusChip from './StatusChip'
import CardActionArea from '@material-ui/core/CardActionArea'
import { Link } from 'react-router-dom'

const EventCard = ({ event, setEditId, setLogDialogOpen }) => {
  const renderLink = React.forwardRef((itemProps, ref) => <Link to={`/commercial-projects/request-log/${event._id}`} {...itemProps} ref={ref} />)
  const initials = event.salesman.split(' ').map((n) => n[0]).join('')
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card style={{ height: '100%' }}>
        <CardActionArea component={renderLink}>
          <CardHeader
            avatar={
              <Avatar aria-label='recipe'>
                {initials}
              </Avatar>
            }
            title={event.title}
            subheader={`request#: ${event.requestId}`}
          />
          <CardContent style={{ paddingTop: 0 }}>
            <div style={{ marginLeft: 55 }}>
              <Typography variant='body2' color='textSecondary' component='p'>
          Added {moment(event.start).fromNow()}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
          Due {moment(event.end).fromNow()} at {moment(event.end).format('hh:mm:ss A')}
              </Typography>
            </div>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                {event.customers.length > 1 ? (
                  <Chip
                    size='small'
                    avatar={<Avatar>{`+${event.customers.length - 1}`}</Avatar>}
                    label={event.customers[0]}
                    style={{ marginRight: 6 }}
                  />
                ) : (
                  <Chip
                    size='small'
                    label={event.customers[0]}
                    style={{ marginRight: 6 }}
                  />
                )}
                <Chip size='small' style={{ marginRight: 6 }} label={event.salesman} />
                <StatusChip status={event.status} />
              </div>
              <div>
                <NumberFormat
                  value={event.amount / 100}
                  displayType={'text'}
                  thousandSeparator
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={'$'}
                  renderText={
                    value => (
                      <Typography variant='subtitle1'>
                        {value}
                      </Typography>
                    )}
                />
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default EventCard
