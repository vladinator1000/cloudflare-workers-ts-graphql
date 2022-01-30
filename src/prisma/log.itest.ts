import closeDbConnection from '../utils/tearDownIntegrationTests'
import { testPrisma } from '../utils/testPrismaClient'

describe('Integration test example', () => {
  // So that CI doesn't hang
  afterAll(closeDbConnection)

  // Clean up before ourselves so that each test doesn't rely on existing data
  beforeEach(async () => {
    testPrisma.log.deleteMany()
  })

  test('can create a log', async () => {
    await testPrisma.log.create({ data: { message: 'Hello', level: 'Info' } })
    const log = await testPrisma.log.findFirst({ where: { message: 'Hello' } })
    expect(log).toBeTruthy()
  })
})
