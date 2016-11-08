import pluralize from 'pluralize'

/*
  Get plural name for table
  ex Chat -> chats

  Get field name for relationships
  ex Chat -> chat_id
*/
module.exports = {
  getTableName: (model) => typeof model === 'string' ? pluralize(model).toLowerCase() : null,
  getFieldName: (model) => typeof model === 'string' ? `${model.toLowerCase()}_id` : null
}
