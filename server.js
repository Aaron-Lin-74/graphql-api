const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },
  random: () => {
    return Math.random()
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6))
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(5000, () => {
  console.log('Running a GraphQL API server at http://localhost:5000/graphql')
})
