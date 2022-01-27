import gql from 'graphql-tag'

export const userSchema = gql`
  type User {
    id: Int!
    name: String!
  }

  type Query {
    users: [User!]!
  }
`
