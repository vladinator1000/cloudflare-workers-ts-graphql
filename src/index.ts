import { handler as handleGql } from './graphql'
import { handleOptions } from './cors'
import { config } from './config'

function handleFetch(request: Request): Response | Promise<Response> {
  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  } else if (['GET', 'POST'].includes(request.method)) {
    return handleGql(request)
  } else {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed',
    })
  }
}

addEventListener('fetch', async (event) => {
  try {
    event.respondWith(handleFetch(event.request))
  } catch (error: any) {
    // const body = config.environment === 'development' ? error : 'Internal error'
    const body = error

    return new Response(body, {
      status: 500,
    })
  }
})
