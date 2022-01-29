import { Resolvers } from '../generated.types'

export const userResolvers: Resolvers = {
  User: {
    async subscriptionPlan(user, _args, context) {
      const plan = await context.prisma.subscriptionPlan.findFirst({
        where: {
          users: {
            every: {
              id: user.id,
            },
          },
        },
      })

      return plan
    },
  },
  Query: {
    users(_, __, context) {
      return context.prisma.user.findMany()
    },
  },
}
