const { isEmpty } = require('./utils/utils')
const threadValidationRules = require('./utils/threadValidationRules')
const replyValidationRules = require('./utils/replyValidationRules')
const validate = (params, target) => {
  if (!params || isEmpty(params)) {
    throw new Error('Validation failed: no parameters given')
  }
  const rules = target === 'thread' ? threadValidationRules : replyValidationRules
  rules.forEach(item => {
    const name = item.name
    if (item.required && !params[name]) {
      throw new Error(`Required field missing: ${item.name}`)
    }
  })
  return params
}
module.exports = validate
