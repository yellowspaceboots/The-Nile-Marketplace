import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import StatusChip from './StatusChip'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

const GET_REQUEST = gql`
  query getRequestQuery($id: ID!) {
    getRequest(id: $id) {
      _id
      requestId
      title
      start
      end
      salesman
      amount
      status
      customers {
        account
        salesmanNumber
        keyAccountId
        name
      }
    }
  }
`

const Request = ({ title, match, ...props }) => {
  const id = match.params.id
  const { loading, data, error } = useQuery(GET_REQUEST, { variables: { id } })
  if (loading) { return <CircularProgress /> }
  if (error) { return <div>Error! {error.message}</div> }
  const getRequest = data.getRequest
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='overline' color='textSecondary' style={{ marginRight: 10, fontWeight: 600 }}>
          {title} {getRequest.requestId}
        </Typography>
        <StatusChip status={getRequest.status} />
      </div>
      <Typography variant='h5' style={{ fontWeight: 600 }}>
        {getRequest.title}
      </Typography>
      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
      <div style={{ display: 'flex' }}>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
          Customer List
            </Typography>
            {getRequest.customers.map(customer => <Typography key={customer.account} variant='h5' component='h2'>{customer.name}</Typography>)}
          </CardContent>
        </Card>
      </div>

    </>
  )
}

export default Request
