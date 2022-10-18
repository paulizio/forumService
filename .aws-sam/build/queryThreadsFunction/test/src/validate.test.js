const validate = require('../../src/validate')
const thread = require('./fixtures/thread.json')
const reply = require('./fixtures/reply.json')
describe('validations', () => {
  describe('thread', () => {
    it('validates thread successfully', () => {
      const result = validate(thread, 'thread')
      expect(result).to.deep.equal(thread)
    })
    it('fails validation if username is missing', () => {
      const { username, ...threadWithoutUsername } = thread
      expect(() => {
        validate(threadWithoutUsername, 'thread')
      }).to.throw('Required field missing: username')
    })
    it('fails validation if title is missing', () => {
      const { title, ...threadWithoutTitle } = thread
      expect(() => {
        validate(threadWithoutTitle, 'thread')
      }).to.throw('Required field missing: title')
    })
    it('fails validation if body is missing', () => {
      const { body, ...threadWithoutBody } = thread
      expect(() => {
        validate(threadWithoutBody, 'thread')
      }).to.throw('Required field missing: body')
    })
  })

  describe('reply', () => {
    it('validates reply successfully', () => {
      const result = validate(reply, 'reply')
      expect(result).to.deep.equal(reply)
    })
    it('fails validation if message is missing', () => {
      const { message, ...threadWithoutMessage } = reply
      expect(() => {
        validate(threadWithoutMessage, 'reply')
      }).to.throw('Required field missing: message')
    })
    it('fails validation if username is missing', () => {
      const { username, ...threadWithoutUsername } = reply
      expect(() => {
        validate(threadWithoutUsername, 'reply')
      }).to.throw('Required field missing: username')
    })
    it('fails validation if threadId is missing', () => {
      const { threadId, ...threadWithoutThreadId } = reply
      expect(() => {
        validate(threadWithoutThreadId, 'reply')
      }).to.throw('Required field missing: threadId')
    })
  })
})
