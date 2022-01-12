import { Benzene, makeHandler, parseGraphQLBody } from '@benzene/http'
import { makeCompileQuery } from '@benzene/jit'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { setCorsHeaders } from '../setCors'

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello() {
      return 'Hello'
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const benzene = new Benzene({ schema, compileQuery: makeCompileQuery() })
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
  }

  return new Response(
    `<html><head><title>Simple GraphiQL Example</title><link href="https://unpkg.com/graphiql/graphiql.min.css" rel="stylesheet" /></head><body style="margin: 0;"><div id="graphiql" style="height: 100vh;"></div> <script crossorigin src="https://unpkg.com/react/umd/react.production.min.js" ></script> <script crossorigin src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" ></script> <script crossorigin src="https://unpkg.com/graphiql/graphiql.min.js" ></script> <script>const graphQLFetcher=graphQLParams=>fetch('/graphql',{method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify(graphQLParams),}).then(response=>response.json()).catch(()=>response.text());ReactDOM.render(React.createElement(GraphiQL,{fetcher:graphQLFetcher}),document.getElementById('graphiql'),);</script> </body></html>`,
    { headers: { 'content-type': 'text/html' } },
  )
}
