const { invokeLambda } = require('../../src/invokeLambda')
const AWSMock = require('aws-sdk-mock')
const FIXTURE = {
  ENV: {
    GET_THREADS_FUNCTION: 'getThreadFunction'
  }
}
describe('invokeLambda', () => {
  let threadId, getParams
  beforeEach(() => {
    process.env = { ...FIXTURE.ENV }
    threadId = 'test-id'
    getParams = {
      httpMethod: 'GET',
      pathParameters: threadId
    }
  })

  afterEach(() => {
    sinon.restore()
    AWSMock.restore()
  })

  it('should invoke get threads function', async () => {
    const invokeStub = sinon.stub()
    invokeStub.resolves({ StatusCode: 200 })

    invokeStub.withArgs({
      FunctionName: process.env.GET_THREADS_FUNCTION,
      Payload: getParams
    }).resolves({
      Payload: sinon.match.string
    }).resolves({
      Payload: JSON.stringify({
        statusCode: 200
      })
    })

    AWSMock.mock('Lambda', 'invoke', invokeStub)

    await invokeLambda(process.env.GET_THREADS_FUNCTION, getParams)

    sinon.assert.calledWith(invokeStub, {
      FunctionName: FIXTURE.ENV.GET_THREADS_FUNCTION,
      LogType: 'Tail',
      Payload: JSON.stringify(getParams)
    })
  })
})
