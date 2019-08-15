import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { accountsPassword, accountsClient, accountsGraphQL } from '../client'
import { withRouter } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/splash.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 85,
    width: 85
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
const LOGIN = gql`
mutation ($serviceName: String!, $params: AuthenticateParamsInput!) {
  authenticate(serviceName: $serviceName, params: $params) {
    sessionId
    tokens {
      refreshToken
      accessToken
      __typename
    }
    __typename
  }
}
`
const GET_USER = gql`
query {
  getUser {
    username
    emails {
      address
    }
  }
}
`
const Splash = ({ login, history }) => {
  const [user, setUser] = useState()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mutationError, setMutationError] = useState('')
  const classes = useStyles()
  const { loading, error, data: { getUser } } = useQuery(GET_USER)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon style={{ fontSize: 50, fontWeight: 100 }} />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => {
                history.push('/')
                login(true)
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={async () => {
                console.log(accountsPassword)
                try {
                  await accountsPassword.login({
                    user: {
                      email
                    },
                    password
                  })
                  const accountsUser = await accountsGraphQL.getUser()
                  console.log(accountsUser)
                  setUser(accountsUser)
                } catch (err) {
                  setMutationError(err.message)
                }
              }}
            >
              Test Login Function
            </Button>
            {/*
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() =>
                loginMutation({
                  variables: {
                    serviceName: 'password',
                    params: {
                      user: {
                        email
                      },
                      password
                    }
                  }
                })}
            >
              Test Login Mutation
            </Button>
            */}
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <p>{mutationError}</p>
            {getUser && <p>{getUser.emails[0].address}</p>}
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(Splash)
