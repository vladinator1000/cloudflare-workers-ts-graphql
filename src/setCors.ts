import { config } from './config'

const allowedOrigins = [config.clientUrl, 'https://studio.apollographql.com']

export function setCorsHeaders(request: Request, response: Response): void {
  const origin = request.headers.get('origin')

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set(
    'Access-Control-Allow-Headers',
    'application/json, Content-type',
  )
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('X-Content-Type-Options', 'nosniff')
}
