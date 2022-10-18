const dynamoResource = require('../../resource/dynamoResource')
const validate = require('../../validate')
const tableName = process.env.THREAD_TABLE
exports.updateThreadHandler = async (event) => {
    if (event.httpMethod !== 'POST' || !event.pathParameters) {
        throw new Error(`Update method only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    const body = JSON.parse(event.body)
    const validatedParams = await validate(body,'thread')
    const updateParams = {
        item: validatedParams,
        expressionValue: { threadId: validatedParams.threadId },
        tableName: tableName
    }

    await dynamoResource.update(updateParams)

    const response = {
        statusCode: 201,
        body: JSON.stringify(validatedParams)
    }
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return response
}
