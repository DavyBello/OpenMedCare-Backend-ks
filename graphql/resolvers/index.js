const userResolvers = require('./user')
const placeHolderResolvers = require('./placeHolder')

module.exports = addResolvers = () => {
  userResolvers();
  placeHolderResolvers();
}
