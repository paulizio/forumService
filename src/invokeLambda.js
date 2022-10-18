const AWS = require('aws-sdk')
const invokeLambda = (functionName, invokeParams) => {
  const lambda = new AWS.Lambda()
  try {
    const params = {
      FunctionName: functionName,
      LogType: 'Tail',
      Payload: JSON.stringify(invokeParams)
    }
    return lambda.invoke(params).promise()
  } catch (err) {
    const error = new Error(`Error invoking Lambda: ${err}`)
    error.code = 400
    return error
  }
}
module.exports = { invokeLambda }
