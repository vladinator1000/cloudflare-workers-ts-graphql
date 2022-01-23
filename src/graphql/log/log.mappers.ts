import { Log as PrismaLog } from '@prisma/client'
import { Level, Log } from '../generated.types'

export function prismaLogToGql(log: PrismaLog): Log {
  return {
    id: log.id,
    level: Level[log.level],
    message: log.message,
  }
}
