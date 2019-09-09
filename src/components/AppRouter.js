import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import RequestLog from './RequestLog'
import Request from './Request'
import MaterialStatus from './MaterialStatus'
import EndOfMonth from './EndOfMonth'
import Profile from './Profile'
import Account from './Account'
import ProjectsCalendar from './ProjectsCalendar'

const AppRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(props) => <Dashboard {...props} title='Overview' />}
      />
      <Route
        exact
        path='/commercial-projects/request-log'
        render={(props) => <RequestLog {...props} title='Request Log' />}
      />
      <Route
        exact
        path='/commercial-projects/calendar'
        render={(props) => <ProjectsCalendar {...props} title={`Project's Calendar`} />}
      />
      <Route
        exact
        path='/commercial-projects/request-log/:id'
        render={(props) => <Request {...props} title='Request' />}
      />
      <Route
        exact
        path='/commercial-projects/material-status'
        render={(props) => <MaterialStatus {...props} title='Material Status Management' />}
      />
      <Route
        exact
        path='/accounting/end-of-month'
        render={(props) => <EndOfMonth {...props} title='End of Month' />}
      />
      <Route
        exact
        path='/settings/profile'
        render={(props) => <Profile {...props} title='Profile' />}
      />
      <Route
        exact
        path='/settings/account'
        render={(props) => <Account {...props} title='Account' />}
      />
    </Switch>
  )
}

export default AppRouter
