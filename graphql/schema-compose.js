const keystone = require('keystone');
const { GQC } = require('graphql-compose');

const addRelationships = require('./relationships');
const addResolvers = require('./resolvers');
const addViewers = require('./viewers');

// Get logic middleware
const {
	isSelf,
	authAccess,
	updateSelf,
	createSelfRelationship,
	updateSelfRelationship,
	findSelfRelationship,
	deleteSelfRelationship,
	createManagedRelationship,
	deleteManagedRelationship
} = require('./logic/common');

// Get TypeComposers
const {
	UserTC,
	BenefactorTC,
	ViewerBenefactorTC
} = require('./composers');

//Add relationships and resolvers to schema
addRelationships();
addResolvers();
addViewers();

// Queries
GQC.rootQuery().addFields({
	user: UserTC.get('$findOne'),
	...authAccess({userType: 'Benefactor'}, {
        viewerBenefactor: ViewerBenefactorTC.get('$benefactorAccess'),
	}),
	...authAccess({userType: 'Benefactor', isActivated: true}, {
        isActivatedViewerBenefactor: ViewerBenefactorTC.get('$benefactorAccess'),
	}),
});

// Mutations
GQC.rootMutation().addFields({
	loginUser: UserTC.getResolver('loginWithEmail'),
});

const schema = GQC.buildSchema();
module.exports = schema;
