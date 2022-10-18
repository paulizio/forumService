const dynamoResource = require('../../resource/dynamoResource')
const repliesTable = process.env.REPLIES_TABLE
exports.getReplyHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`)
  }
  const { replyId, threadId } = event.pathParameters
  const params = {
    threadId,
    replyId,
    tableName: repliesTable
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
