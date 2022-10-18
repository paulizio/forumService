const tableName = process.env.REPLIES_TABLE
const dynamoResource = require('../../resource/dynamoResource')
exports.queryRepliesHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`)
  }
  if (!event.queryStringParameters) throw new Error('Missing querystring parameters')
  const { threadId } = event.queryStringParameters
  const params = {
    tableName,
    threadId
  }
  const data = await dynamoResource.getAll(params)
  const items = data.Items

  const response = {
    statusCode: 200,
    body: JSON.stringify(items)
  }
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
