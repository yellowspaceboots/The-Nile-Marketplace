import React, { Suspense, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import Splash from './components/Splash'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Layout from './components/Layout'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { BrowserRouter as Router } from 'react-router-dom'
import { client } from './client'

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

const App = () => {
  const [loggedIn, login] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ApolloProvider client={client}>
          <Router>
            <CssBaseline />
            <Suspense fallback={<div>Loading...</div>}>
              { loggedIn ? <Layout login={login} /> : <Splash login={login} /> }
            </Suspense>
          </Router>
        </ApolloProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default App
