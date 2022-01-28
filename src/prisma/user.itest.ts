import closeDbConnection from '../utils/tearDownIntegrationTests'
import { testPrisma } from '../utils/testPrismaClient'

describe('User integration test example', () => {
  // So that CI doesn't hang
  afterAll(closeDbConnection)

  // Clean up before ourselves so that each test doesn't rely on existing data
  beforeEach(async () => {
    testPrisma.user.deleteMany()
  })

  test('can create a user', async () => {
    await testPrisma.user.create({ data: { name: 'Gandalf' } })
    const user = await testPrisma.user.findFirst({ where: { name: 'Gandalf' } })
    expect(user?.name).toEqual('Gandalf')
  })
})
