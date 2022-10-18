const dynamodb = require('aws-sdk/clients/dynamodb')
const docClient = new dynamodb.DocumentClient()
const { expressionBuilder } = require('../utils/utils')

const getAll = (params) => {
  const { tableName, ...expressionValue } = params
  const expressionAttributes = expressionBuilder(expressionValue, true)
  try {
    return docClient.query({
      TableName: tableName,
      Limit: params.count || 5000,
      ...(expressionAttributes && { ...expressionAttributes })
    }).promise()
  } catch (err) {
    throw new Error(`Error fetching items: ${err}`)
  }
}

const scan = (params) => {
  try {
    return docClient.scan(params).promise()
  } catch (err) {
    throw new Error(`Error fetching items: ${err}`)
  }
}

const getItem = (params) => {
  const { tableName, ...key } = params
  try {
    return docClient.get({
      TableName: params.tableName,
      Key: key
    }).promise()
  } catch (err) {
    throw new Error(`Error fetching item: ${err}`)
  }
}

const create = ({ item, conditionExpression, tableName }) => {
  try {
    return docClient.put({
      TableName: tableName,
      Item: item,
      ConditionExpression: `attribute_not_exists(${conditionExpression})`
    }).promise()
  } catch (err) {
    throw new Error(`Error creating new item: ${err}`)
  }
}

const update = ({ item, expressionValue, tableName }) => {
  const expressionAttributes = expressionBuilder(expressionValue)
  console.log('ExpressionAttributes..', expressionAttributes)
  try {
    return docClient.put({
      TableName: tableName,
      Item: item,
      ...expressionAttributes
    }).promise()
  } catch (err) {
    throw new Error(`Error updating item: ${err}`)
  }
}
module.exports = {
  getAll,
  getItem,
  create,
  update,
  scan
}
