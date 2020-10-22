const { Model } = require('objection')
const knex = require('../db')
const Link = require('./link')

Model.knex(knex)

const models = [ Link ]
const ready = Promise.all(models.map(create))

async function create(m){
    return await knex.schema.hasTable(m.tableName)
        || await knex.schema.createTable(m.tableName, m.recipe)
}

module.exports = {
    ready,
    destroy: knex.destroy,
    Link,
}
