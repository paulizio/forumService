const dynamoResource = require('../../resource/dynamoResource')
const tableName = process.env.THREAD_TABLE
exports.getThreadHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`)
  }
  const { threadId } = event.pathParameters
  const params = {
    tableName,
    threadId
  }
  const data = await dynamoResource.getItem(params)
  const item = data.Item
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  }

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
