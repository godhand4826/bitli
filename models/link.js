const { Model } = require('objection')
const knex = require('../db')

class Link extends Model{
    static get tableName() {
        return 'link'
    }
    static get recipe(){
        return table => {
            table.increments('id').primary()
            table.string('origin')
            table.string('shorten').unique()
            table.timestamp('created_at').defaultTo(knex.fn.now())
        }
    }
}

module.exports = Link
