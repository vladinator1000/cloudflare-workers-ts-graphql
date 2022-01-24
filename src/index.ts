import { Router, listen } from 'worktop'
import { preflight } from 'worktop/cors'

import { handleGraphql } from './graphql'
import { config } from './config'

const router = new Router()

router.prepare = preflight({
  origin: '*', // allow any `Origin` to connect
  headers: ['Cache-Control', 'Content-Type', 'X-Count'],
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
})

router.add('GET', '/graphql', handleGraphql)
router.add('POST', '/graphql', handleGraphql)
router.add('GET', '/', () => {
  return Response.redirect(config.gqlExplorerUrl, 301)
})

listen(router.run)
