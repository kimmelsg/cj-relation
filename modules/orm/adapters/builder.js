import adapter from './index'

export default class Builder {
  constructor(options, model) {
    this.options = options
    this.model = model
  }

  limit(limit) {
    this.options.limit = limit
    return this
  }

  select(...select) {
    this.options.select = select
    return this
  }

  where(where) {
    this.options.where = where
    return this
  }

  first() {
    this.options.limit = 1
    return this.get()
  }

  get() {
    return adapter.select(this.options, this.model)
  }
}
