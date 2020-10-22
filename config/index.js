const result = require('dotenv').config()
if (result.error) {
    throw result.error
}
result.parsed.KEYS = result.parsed.KEYS.split(',')
module.exports = Object.freeze(result.parsed)
