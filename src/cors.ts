import { Handler } from 'worktop'
import { ServerRequest } from 'worktop/request'
import { config } from './config'

const allowedOrigins = [config.clientUrl, 'https://studio.apollographql.com']

export function setCorsHeaders(
  request: ServerRequest,
  response: Response,
): void {
  const origin = request.headers.get('Origin')

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.append('Access-Control-Allow-Origin', origin)
  }

  response.headers.append('Access-Control-Allow-Credentials', 'true')
  response.headers.append(
    'Access-Control-Allow-Headers',
    'Content-Type, authorization',
  )
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.append('X-Content-Type-Options', 'nosniff')
}

export const handleOptions: Handler = (request) => {
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    const response = new Response(null)
    setCorsHeaders(request, response)
    return response
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}
