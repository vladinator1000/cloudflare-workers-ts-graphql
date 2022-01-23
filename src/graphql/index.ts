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

export async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/graphql')) {
    const headers = Object.fromEntries(request.headers)
    const rawBody = await request.text()
    const result = await graphqlHandler({
      method: request.method,
      headers,
      body: parseGraphQLBody(rawBody, headers['content-type']),
      query: Object.fromEntries(url.searchParams),
    })

    const response = new Response(JSON.stringify(result.payload), {
      headers: new Headers(result.headers as any),
      status: result.status,
    })

    setCorsHeaders(request, response)
    return response
  } else {
    return Response.redirect(config.gqlExplorerUrl, 301)
  }
}
