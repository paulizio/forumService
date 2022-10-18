const dynamoResource = require('../../resource/dynamoResource')
const validate = require('../../validate')
const uuid = require('../../utils/uuid')
const tableName = process.env.THREAD_TABLE
exports.createThreadHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    )
  }
  const body = JSON.parse(event.body)
  if (!body.replies) body.replies = []
  body.threadId = uuid.v4()
  const validatedParams = validate(body, 'thread')

  const createParams = {
    item: validatedParams,
    tableName,
    conditionExpression: 'threadId'
  }
  await dynamoResource.create(createParams)
  const response = {
    statusCode: 201,
    body: JSON.stringify(validatedParams)
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  )
  return response
}
