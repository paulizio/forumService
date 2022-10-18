const get = require('../../../../src/handlers/threadHandlers/get')
const dynamoResource = require('../../../../src/resource/dynamoResource')
const uuid = require('../../../../src/utils/uuid')
describe('get', () => {
  let thread, params, response
  beforeEach(() => {
    thread = {
      title: 'test title',
      body: 'test body',
      username: 'test_username',
      replies: [],
      threadId: 'test-id'
    }
    response = {
      statusCode: 200,
      body: JSON.stringify(thread)
    }
    params = {
      httpMethod: 'GET',
      pathParameters: { threadId: 'some-id' }
    }
    sinon.stub(dynamoResource, 'getItem').resolves({ Item: { ...thread} })
    sinon.stub(uuid, 'v4').returns('test-id')
    sinon.spy(get, 'getThreadHandler')
  })

  afterEach(() => sinon.restore())

  it('should call get with params', async () => {
    await get.getThreadHandler(params)
    expect(get.getThreadHandler).to.have.been.calledWith(params)
  })
  it('should return expected response', async () => {
    const res = await get.getThreadHandler(params)
    expect(res).to.deep.equal(response)
    expect(res.statusCode).equal(200)
  })
})
