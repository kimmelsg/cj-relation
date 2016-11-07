import pluralize from 'pluralize'


module.exports = { 
  getTableName: (model) => pluralize(model).toLowerCase(),
  getFieldName: (model) => `${model.toLowerCase()}_id`
}
