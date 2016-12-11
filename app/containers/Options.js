/*eslint-disable */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Options.prod.js');
} else {
  module.exports = require('./Options.dev.js');
}
