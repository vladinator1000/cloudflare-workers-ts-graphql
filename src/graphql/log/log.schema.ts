import gql from 'graphql-tag'

export const logSchema = gql`
  type Query {
    logs: [Log!]!
  }

  type Log {
    id: Int!
    level: Level!
    message: String!
  }

  enum Level {
    Info
    Warn
    Error
    Critical
  }
`
