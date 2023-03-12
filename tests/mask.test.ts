import { test, assert } from 'vitest'

const renderEmail = (email: string) => {
  if (email) {
    let skip = false
    return email.split('').reduce((prev: string, next: string, index: number) => {
      if (next === '@') {
        skip = true
      }
      if (skip) return `${prev}${next}`
      if (index > 3) {
        return `${prev}*`
      }
      return `${prev}${next}`
    }, '')
  }
  return ''
}

test('renderEmail', () => {
  assert.equal(renderEmail('844911111@qq.com'), '8449*****@qq.com')
  assert.equal(renderEmail('8449@qq.com'), '8449@qq.com')
  assert.equal(renderEmail('84@qq.com'), '84@qq.com')
})
