const create = require('../../../../src/handlers/threadHandlers/create')
const dynamoResource = require('../../../../src/resource/dynamoResource')
const uuid = require('../../../../src/utils/uuid')
describe('create', () => {
  let thread, params
  beforeEach(() => {
    thread = {
      title: 'test title',
      body: 'test body',
      username: 'test_username'
    }
    params = {
      httpMethod: 'POST',
      body: JSON.stringify(thread)
    }
    sinon.stub(dynamoResource, 'create').resolves()
    sinon.stub(uuid, 'v4').returns('test-id')
    sinon.spy(create, 'createThreadHandler')
  })

  afterEach(() => sinon.restore())

  it('should create a thread', async () => {
    await create.createThreadHandler(params)
    expect(create.createThreadHandler).to.have.been.calledWith(params)
  })
  it('should return expected response', async () => {
    const response = {
      ...thread,
      replies: [],
      threadId: 'test-id'
    }
    const res = await create.createThreadHandler(params)
    expect(res.body).to.deep.equal(JSON.stringify(response))
    expect(res.statusCode).equal(201)
  })
})
