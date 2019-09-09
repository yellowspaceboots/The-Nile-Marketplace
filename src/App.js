import React, { Suspense, useState, useEffect, lazy } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import Splash from './components/Splash'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { client, accountsClient, accountsGraphQL } from './client'

const Layout = lazy(() => import('./components/Layout'))

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5169a5',
      main: '#1e3f76',
      dark: '#001a4a',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffed73',
      main: '#ffbb41',
      dark: '#c88b00',
      contrastText: '#000000'
    }
  }
})

const AuthenticatedApp = withRouter(({ history }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    fetchUser()
  }, [])
  const fetchUser = async () => {
    // refresh the session to get a new accessToken if expired
    const tokens = await accountsClient.refreshSession()
    if (!tokens) {
      history.push('/login')
    } else {
      const accountsUser = await accountsGraphQL.getUser()
      setUser(accountsUser)
      if (history.location.pathname === '/login') {
        history.push('/')
      }
    }
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route
        exact
        path='/login'
        render={(props) => <Splash {...props} />}
      />
      <Route
        path='/'
        render={(props) => <Layout {...props} />}
      />
    </Switch>
    </Suspense>
  )
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ApolloProvider client={client}>
          <Router>
            <CssBaseline />
            <AuthenticatedApp />
          </Router>
        </ApolloProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default App
