import pluralize from 'pluralize'


module.exports = { 
  getTableName: (model) => typeof model === 'string' ? pluralize(model).toLowerCase() : null,
  getFieldName: (model) => typeof model === 'string' ? `${model.toLowerCase()}_id` : null
}
