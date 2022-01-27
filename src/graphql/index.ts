import {
  Benzene,
  makeHandler,
  parseGraphQLBody,
  makeCompileQuery,
} from '@benzene/http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { helloSchema } from './hello/hello.schema'
import { logSchema } from './log/log.schema'
import { logResolvers } from './log/log.resolvers'
import { helloResolvers } from './hello/hello.resolvers'
import { Handler } from 'worktop'
import { config } from '../config'
import { createFetchClient } from 'prisma-proxy-fetch-client'
import { userSchema } from './user/user.schema'
import { userResolvers } from './user/user.resolvers'

const typeDefs = mergeTypeDefs([helloSchema, logSchema, userSchema])
const resolvers = mergeResolvers([helloResolvers, logResolvers, userResolvers])
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const benzene = new Benzene({
  schema,
  compileQuery: makeCompileQuery(),
  contextFn: () => {
    console.log({ env: config.environment })

    const prisma =
      config.environment === 'development'
        ? createFetchClient<PrismaClient>({ baseUrl: config.prismaDevProxyUrl })
        : new PrismaClient()

    return {
      prisma,
    }
  },
})
const graphqlHandler = makeHandler(benzene)

export const handleGraphql: Handler = async (request, response) => {
  try {
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => (headers[key] = value))
    const body = await request.body.text()

    const result = await graphqlHandler({
      method: request.method,
      headers,
      body: parseGraphQLBody(body, headers['content-type']),
      query: request.params,
    })

    response.send(
      result.status,
      JSON.stringify(result.payload),
      result.headers as any,
    )
  } catch (error) {
    console.error(error)
    response.send(500, error)
  }
}
