const tableName = process.env.THREAD_TABLE
const dynamoResource = require('../../resource/dynamoResource')

exports.queryThreadsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`)
  }
  const params = {
    TableName: tableName
  }
  const data = await dynamoResource.scan(params)
  const items = data.Items

  const response = {
    statusCode: 200,
    body: JSON.stringify(items)
  }
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
