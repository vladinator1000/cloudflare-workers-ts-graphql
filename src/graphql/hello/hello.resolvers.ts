import { Resolvers } from '../generated.types'

export const helloResolvers: Resolvers = {
  Query: {
    hello() {
      return 'Hello, world!'
    },

    async testDbConnection(_, __, { prisma }) {
      const result: any = await prisma.$queryRaw`SELECT 1 + 1`

      return result[0]['?column?']
    },
  },
}
