const path = require('path')
const Knex = require('knex')

const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: path.join(__dirname, 'sqlite3.db') }
})

module.exports = knex
