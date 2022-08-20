import { filterByEntries } from './array'

const array = [
  { k1: 'A', k2: 1, k3: true },
  { k1: 'A', k2: 2, k3: true },
  { k1: 'A', k2: 3, k3: false },
  { k1: 'B', k2: 2, k3: true },
  { k1: 'B', k2: 1, k3: true },
  { k1: 'a', k2: 3, k3: true },
]

describe('filterByEntries', () => {
  it('should find items', () => {
    expect.assertions(2)
    expect(filterByEntries(array, { k1: 'A', k3: 'true' })).toStrictEqual([array[0], array[1]])
    expect(filterByEntries(array, { k2: '3' })).toStrictEqual([array[2], array[5]])
  })
})
