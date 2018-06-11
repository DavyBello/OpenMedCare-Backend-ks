const userResolvers = require('./user')

module.exports = addResolvers = () => {
  userResolvers();
}
