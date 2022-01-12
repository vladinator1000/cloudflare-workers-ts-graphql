import { handler as gqlHandler } from './graphql'

addEventListener('fetch', async (event) => {
  try {
    event.respondWith(gqlHandler(event.request))
  } catch (error) {
    new Response(error as any, {
      status: 500,
    })
  }
})
