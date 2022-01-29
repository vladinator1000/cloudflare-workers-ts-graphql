import gql from 'graphql-tag'

export const userSchema = gql`
  type User {
    id: Int!
    name: String!
    subscriptionPlan: SubscriptionPlan
  }

  type SubscriptionPlan {
    id: Int!
    tier: SubscriptionTier!
  }

  enum SubscriptionTier {
    Gold
    Silver
    Bronze
  }

  type Query {
    users: [User!]!
  }
`
