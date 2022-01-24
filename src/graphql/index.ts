import {
  Benzene,
  makeHandler,
  parseGraphQLBody,
  makeCompileQuery,
} from '@benzene/http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { config } from '../config'
import { setCorsHeaders } from '../cors'

import { helloSchema } from './hello/hello.schema'
import { logSchema } from './log/log.schema'
import { logResolvers } from './log/log.resolvers'
import { helloResolvers } from './hello/hello.resolvers'
import { Handler } from 'worktop'

const typeDefs = mergeTypeDefs([helloSchema, logSchema])
const resolvers = mergeResolvers([helloResolvers, logResolvers])
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const benzene = new Benzene({
  schema,
  compileQuery: makeCompileQuery(),
  contextFn: () => ({
    prisma: new PrismaClient(),
  }),
})
const graphqlHandler = makeHandler(benzene)

export const handleGraphql: Handler = async (request, response) => {
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
}
