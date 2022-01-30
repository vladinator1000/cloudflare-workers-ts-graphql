import { createPrismaExpressProxy } from 'prisma-proxy-express-server'
import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

// This server allows us to use a local database when developing the cloudflare worker
createPrismaExpressProxy({
  app,
  prisma,
  middleware: {},
  defaultMiddleware: (_req, _res, next) => next(),
})

const server = app.listen(3333, () => {
  console.info('Prisma dev proxy listening on port 3333')
})

server.on('error', console.error)
