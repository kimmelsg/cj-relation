import { getTableName, getFieldName } from '../../../modules/global/get-name'

describe('get-name', () => {
  it('gets the plural table name', () => {
    expect(getTableName('Chat')).to.equal('chats')
  })

  it('gets the field name from model name', () => {
    expect(getFieldName('Chat')).to.equal('chat_id')
  })

  it('gets null if not a string', () => {
    expect(getFieldName({})).to.equal(null)
    expect(getTableName({})).to.equal(null)
  })
})
