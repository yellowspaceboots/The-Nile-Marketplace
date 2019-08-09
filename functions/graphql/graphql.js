/*
import { DatabaseManager } from '@accounts/database-manager'
import AccountsModule from '@accounts/graphql-api'
import AccountsPassword from '@accounts/password'
import AccountsServer from '@accounts/server'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'
*/
// import MongoDBInterface from '@accounts/mongo'
// const db = require('./server')
// const initialState = require('./requests')
const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date')
const {
  ApolloServer,
  gql
} = require('apollo-server-lambda')

const today = new Date()
const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
const initialState = [
  {
    id: 0,
    title: 'My testing project name testing',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk',
      'Merit Electric'
    ]
  },
  {
    id: 1,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Pending',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 2,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Lost',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 3,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Won',
    customers: [
      'Britain Electric'
    ]
  },
  {
    id: 4,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 5,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 6,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Fisk'
    ]
  },
  {
    id: 7,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric'
    ]
  },
  {
    id: 8,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 9,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 10,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 11,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 12,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 13,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 14,
    title: 'My testing project name',
    start: today,
    end: endDate,
    salesman: 'Jon Busch',
    amount: '90,000.00',
    status: 'Open',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  },
  {
    id: 15,
    title: 'My testing project name that\'s is really really long',
    start: today,
    end: endDate,
    salesman: 'Tex Tarango',
    amount: '900.00',
    status: 'Won',
    customers: [
      'Britain Electric',
      'Fisk'
    ]
  }
]

const typeDefs = gql`
  scalar Date
  scalar DateTime
  type Query {
    hello: String
    getRequest(id: Int!): Request
    getRequests: [Request]
  }
  type Request {
      id: Int
      title: String
      start: DateTime
      end: DateTime
      salesman: String
      amount: String
      status: String
      customers: [String]
    }
`

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    hello: (parent, args, context) => {
      return 'Hello, world!'
    },
    getRequest: (obj, args, context) => {
      const result = initialState.filter(result => result.id === args.id)[0]
      return result
    },
    getRequests: () => {
      return initialState
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.handler = server.createHandler()

/*
const userStorage = new Mongo(db)
// Create database manager (create user, find users, sessions etc) for accounts-js
const accountsDb = new DatabaseManager({
  sessionStorage: userStorage,
  userStorage
})

const accountsPassword = new AccountsPassword({
  // This option is called when a new user create an account
  // Inside we can apply our logic to validate the user fields
  validateNewUser: user => {
    // For example we can allow only some kind of emails
    if (user.email.endsWith('.xyz')) {
      throw new Error('Invalid email')
    }
    return user
  }
})

// Create accounts server that holds a lower level of all accounts operations
const accountsServer = new AccountsServer(
  { db: accountsDb, tokenSecret: 'davidissilly' },
  {
    password: accountsPassword
  }
)

// Creates resolvers, type definitions, and schema directives used by accounts-js
const accountsGraphQL = AccountsModule.forRoot({
  accountsServer
})

const typeDefs = gql`
  scalar Date
  scalar DateTime
  type PrivateType @auth {
    field: String
  }
  # Our custom fields to add to the user
  extend input CreateUserInput {
    profile: CreateUserProfileInput!
  }
  input EventInput {
    title: String!
    start: DateTime!
    end: DateTime!
    salesman: String!
    amount: Float!
  }
  input CreateUserProfileInput {
    firstName: String!
    lastName: String!
  }
  type Query {
    hello: String
    testing: String
    getRequest(id: Int!): Request
    getRequests: [Request]
    publicField: String
    privateField: String @auth
    privateType: PrivateType
  }
  type Mutation {
    addEvent(event: EventInput!): String
  }
  type Request {
    id: Int
    title: String
    start: DateTime
    end: DateTime
    salesman: String
    amount: String
    status: String
    customers: [String]
  }
`
const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    hello: () => 'Hello world!',
    testing: () => {
      return 'testing'
    },
    getRequest: (obj, args, context) => {
      const result = initialState.filter(result => result.id === args.id)[0]
      return result
    },
    getRequests: () => {
      return initialState
    },
    publicField: () => 'public',
    privateField: () => 'private',
    privateType: () => ({
      field: () => 'private'
    })
  },
  Mutation: {
    addEvent: () => {
      return 'testing'
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives
  }
})

// Create the Apollo Server that takes a schema and configures internal stuff
const server = new ApolloServer({
  context: accountsGraphQL.context,
  schema,
  introspection: true, // enables introspection of the schema
  playground: true // enables the actual playground
})

export async function handler (event, context, callback) {
  try {
    const handler = await server.createHandler()
    context.callbackWaitsForEmptyEventLoop = false
    return handler(event, context, callback)
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}

/*
const runHandler = (event, context, handler) => (
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body))

    handler(event, context, callback)
  }))

const run = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // Build a storage for storing users
  const userStorage = new Mongo(db)
  // Create database manager (create user, find users, sessions etc) for accounts-js
  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage
  })

  const accountsPassword = new AccountsPassword({
    // This option is called when a new user create an account
    // Inside we can apply our logic to validate the user fields
    validateNewUser: user => {
      // For example we can allow only some kind of emails
      if (user.email.endsWith('.xyz')) {
        throw new Error('Invalid email')
      }
      return user
    }
  })

  // Create accounts server that holds a lower level of all accounts operations
  const accountsServer = new AccountsServer(
    { db: accountsDb, tokenSecret: 'davidissilly' },
    {
      password: accountsPassword
    }
  )

  // Creates resolvers, type definitions, and schema directives used by accounts-js
  const accountsGraphQL = AccountsModule.forRoot({
    accountsServer
  })

  const typeDefs = gql`
    scalar Date
    scalar DateTime
    type PrivateType @auth {
      field: String
    }
    # Our custom fields to add to the user
    extend input CreateUserInput {
      profile: CreateUserProfileInput!
    }
    input EventInput {
      title: String!
      start: DateTime!
      end: DateTime!
      salesman: String!
      amount: Float!
    }
    input CreateUserProfileInput {
      firstName: String!
      lastName: String!
    }
    type Query {
      hello: String
      testing: String
      getRequest(id: Int!): Request
      getRequests: [Request]
      publicField: String
      privateField: String @auth
      privateType: PrivateType
    }
    type Mutation {
      addEvent(event: EventInput!): String
    }
    type Request {
      id: Int
      title: String
      start: DateTime
      end: DateTime
      salesman: String
      amount: String
      status: String
      customers: [String]
    }
  `
  const resolvers = {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    Query: {
      hello: () => 'Hello world!',
      testing: () => {
        return 'testing'
      },
      getRequest: (obj, args, context) => {
        const result = initialState.filter(result => result.id === args.id)[0]
        return result
      },
      getRequests: () => {
        return initialState
      },
      publicField: () => 'public',
      privateField: () => 'private',
      privateType: () => ({
        field: () => 'private'
      })
    },
    Mutation: {
      addEvent: () => {
        return 'testing'
      }
    }
  }

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives
    }
  })

  // Create the Apollo Server that takes a schema and configures internal stuff
  const server = new ApolloServer({
    context: accountsGraphQL.context,
    schema,
    introspection: true, // enables introspection of the schema
    playground: true // enables the actual playground
  })
  const handler = server.createHandler({ cors: { credentials: true, origin: '*' } })
  const response = await runHandler(event, context, handler)

  return response
}

exports.handler = run
*/
