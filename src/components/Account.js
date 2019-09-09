import React from 'react'
import Typography from '@material-ui/core/Typography'
// import { accountsGraphQL } from '../client'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

const Account = ({ title, ...props }) => {
  /*
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mutationError, setMutationError] = useState('')
  const createUser = async () => {
    setMutationError(null)
    try {
      await accountsGraphQL.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName
        }
      })
    } catch (err) {
      setMutationError(err.message)
    }
  }
  */
  return (
    <React.Fragment>
      <Typography variant='overline' color='textSecondary' style={{ marginBottom: 30, fontWeight: 600 }}>
        {title}
      </Typography>
      {/*
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
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='firstName'
        label='First Name'
        id='firstName'
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='lastName'
        label='Last Name'
        id='lastName'
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={() => createUser()}
      >
              Test
      </Button>
      <p>{mutationError}</p>
      */}

    </React.Fragment>
  )
}

export default Account
