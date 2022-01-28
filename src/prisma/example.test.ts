function add1(num: number): number {
  return num + 1
}

describe('Exapmle unit test', () => {
  test('adds one', () => {
    expect(add1(2)).toEqual(3)
  })
})
