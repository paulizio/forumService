const isEmpty = (obj) => {
  if (!obj) throw new Error('Validation failed: no parameters given')
  return Object.keys(obj).length === 0
}

const expressionBuilder = (item, query) => {
  if (!item || !(typeof item === 'object' && item !== null)) throw new Error('Validation failed: parameter missing or given parameter is not an object')
  const [key, value] = Object.entries(item)[0]
  if (query) {
    return {
      KeyConditionExpression: `${key} = :${key}`,
      ExpressionAttributeValues: {
        [`:${key}`]: value
      }
    }
  }
  return {
    ConditionExpression: `#${key} = :${key}`,
    ExpressionAttributeNames: { [`#${key}`]: key },
    ExpressionAttributeValues: {
      [`:${key}`]: value
    }
  }
}
module.exports = { isEmpty, expressionBuilder }
