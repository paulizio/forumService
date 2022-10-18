const { isEmpty, expressionBuilder } = require('../../../src/utils/utils')
describe('Utils', () => {
  describe('isEmpty', () => {
    it('returns true if object is empty', () => {
      const obj = {}
      const result = isEmpty(obj)
      expect(result).to.deep.equal(true)
    })
    it('returns false if object is not empty', () => {
      const obj = { foo: 'bar' }
      const result = isEmpty(obj)
      expect(result).to.deep.equal(false)
    })
    it('throws error if no parameters given', () => {
      expect(() => {
        isEmpty(undefined)
      }).to.throw('Validation failed: no parameters given')
    })
  })

  describe('expressionBuilder', () => {
    let expressionValue, expectedQueryResult, expectedResult
    beforeEach(() => {
      expressionValue = { foo: 'bar' }
      expectedResult = {
        ConditionExpression: '#foo = :foo',
        ExpressionAttributeNames: { '#foo': 'foo' },
        ExpressionAttributeValues: { ':foo': 'bar' }
      }

      expectedQueryResult = {
        ExpressionAttributeValues: { ':foo': 'bar' },
        KeyConditionExpression: 'foo = :foo'
      }
    })

    it('builds expression for update operation', () => {
      const result = expressionBuilder(expressionValue)
      expect(result).to.deep.equal(expectedResult)
    })
    it('builds expression for query operation', () => {
      const result = expressionBuilder(expressionValue, true)
      expect(result).to.deep.equal(expectedQueryResult)
    })
    it('throws error if no parameters given', () => {
      expect(() => {
        expressionBuilder(undefined)
      }).to.throw('Validation failed: parameter missing or given parameter is not an object')
    })
    it('throws error if given parameter is not an object', () => {
      expect(() => {
        expressionBuilder('foobar')
      }).to.throw('Validation failed: parameter missing or given parameter is not an object')
    })
  })
})
