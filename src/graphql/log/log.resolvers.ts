import { Resolvers } from '../generated.types'
import { prismaLogToGql } from './log.mappers'

export const logResolvers: Resolvers = {
  Query: {
    async logs(_, __, { prisma }) {
      const logs = await prisma.log.findMany()
      return logs.map(prismaLogToGql)
    },
  },
}
