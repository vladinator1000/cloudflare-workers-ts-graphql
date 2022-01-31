import { Router, listen } from 'worktop'
import { preflight } from 'worktop/cors'

import { handleGraphql } from './graphql'
import { config } from './config'

const router = new Router()

// Cross-origin resource sharing settings
router.prepare = preflight({
  origin: '*', // allow any `Origin` to connect for now
  credentials: true,
  headers: ['Cache-Control', 'Content-Type', 'Authorization'],
  methods: ['GET', 'HEAD', 'POST'],
})

router.add('GET', '/graphql', handleGraphql)
router.add('POST', '/graphql', handleGraphql)
router.add('GET', '/', (request) => {
  console.log(config.environment)

  const host =
    config.environment === 'development'
      ? `http://${request.hostname}:8787`
      : request.hostname

  const redirectionUrl = `${config.gqlExplorerUrl}?endpoint=${host}/graphql`
  return Response.redirect(redirectionUrl, 301)
})

listen(router.run)
