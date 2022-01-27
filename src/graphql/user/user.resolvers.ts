import { Resolvers } from '../generated.types'

export const userResolvers: Resolvers = {
  Query: {
    users(_, __, context) {
      return context.prisma.user.findMany()
    },
  },
}
