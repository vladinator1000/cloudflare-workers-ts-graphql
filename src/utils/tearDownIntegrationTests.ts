import { testPrisma } from './testPrismaClient'

export async function closeDbConnection() {
  await testPrisma.$disconnect()
}

export default closeDbConnection
