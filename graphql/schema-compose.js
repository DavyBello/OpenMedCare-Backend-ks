const keystone = require('keystone');
const { GQC } = require('graphql-compose');

// const addRelationships = require('./relationships');
// const addResolvers = require('./resolvers');
// const addViewers = require('./viewers');

// Get logic middleware
// const {
// 	isSelf,
// 	authAccess,
// 	updateSelf,
// 	createSelfRelationship,
// 	updateSelfRelationship,
// 	findSelfRelationship,
// 	deleteSelfRelationship,
// 	createManagedRelationship,
// 	deleteManagedRelationship
// } = require('./logic/common');

// Get TypeComposers
const {
	UserTC,
} = require('./composers');

//Add relationships and resolvers to schema
// addViewers();
// addRelationships();
// addResolvers();

// Queries
GQC.rootQuery().addFields({
	user: UserTC.get('$findOne')
});

// Mutations
// GQC.rootMutation().addFields({
//
// });

const schema = GQC.buildSchema();
module.exports = schema;
