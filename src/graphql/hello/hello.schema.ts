import gql from 'graphql-tag'

export const helloSchema = gql`
  type Query {
    hello: String
    goodbye: String

    """
    Asks Postgres what is 1 + 1
    """
    testDbConnection: Int
  }
`
