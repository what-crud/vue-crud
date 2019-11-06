import {
  parseIntIfNumber,
  download,
  humanFileSize,
} from '@/utils/crud/helpers/functions'

describe('parseIntIfNumber', () => {
  it('float', () => {
    expect(parseIntIfNumber(100.346)).toBe(100.346)
  })
  it('stringified integer', () => {
    expect(parseIntIfNumber('1234')).toBe(1234)
  })
  it('integer', () => {
    expect(parseIntIfNumber(1234)).toBe(1234)
  })
  it('stringified float', () => {
    expect(parseIntIfNumber('1234.34745687')).toBe('1234.34745687')
  })
  it('string', () => {
    expect(parseIntIfNumber('test')).toBe('test')
  })
})
describe('download', () => {
  it('1', () => {
    expect(download('foo', 'bar')).toBe(undefined)
  })
})
describe('humanFileSize', () => {
  it('kB non si', () => {
    expect(humanFileSize(1000, false)).toBe('1000 B')
  })
  it('kB si', () => {
    expect(humanFileSize(1000, true)).toBe('1.0 kB')
  })
  it('kB default', () => {
    expect(humanFileSize(1000)).toBe('1000 B')
  })
  it('MB si', () => {
    expect(humanFileSize(1000000, true)).toBe('1.0 MB')
  })
  it('almost MB si', () => {
    expect(humanFileSize(999999, true)).toBe('1000.0 kB')
  })
})
