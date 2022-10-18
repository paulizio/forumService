const dynamoResource = require('../../resource/dynamoResource')
const validate = require('../../validate')
const repliesTable = process.env.REPLIES_TABLE
const getThreadFunction = process.env.GET_THREADS_FUNCTION
const updateThreadFunction = process.env.UPDATE_THREAD_FUNCTION
const uuid = require('uuid')
const { invokeLambda } = require('../../invokeLambda')
exports.createReplyHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  const body = JSON.parse(event.body)
  body.replyId = uuid.v4()

  const key = {
    threadId: body.threadId
  }
  // Get thread and add reply id to replies array
  const getParams = {
    httpMethod: 'GET',
    pathParameters: key
  }
  const { Payload } = await invokeLambda(getThreadFunction, getParams)
  const item = JSON.parse(Payload)
  const threadToUpdate = JSON.parse(item.body)
  const validatedReply = validate(body, 'reply')
  threadToUpdate.replies.push(body.replyId)
  const validatedThread = validate(threadToUpdate, 'thread')

  // Update thread with new reply
  const updateParams = {
    httpMethod: 'POST',
    body: JSON.stringify(validatedThread),
    pathParameters: body.threadId
  }
  await invokeLambda(updateThreadFunction, updateParams)
  // Post reply to replies table
  const createParams = {
    item: validatedReply,
    tableName: repliesTable,
    conditionExpression: 'replyId'
  }
  await dynamoResource.create(createParams)

  const response = {
    statusCode: 201,
    body: JSON.stringify(body)
  }
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
