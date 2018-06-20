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
	PlaceHolderTC,
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
	user: UserTC.getResolver('findOne'),
	...authAccess({sourceUserType: 'Benefactor'}, {
		benefactorIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerBenefactor: ViewerBenefactorTC.getResolver('benefactorAccess'),
	}),
	...authAccess({sourceUserType: 'HPStaff'}, {
		HPStaffIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerHPStaff: PlaceHolderTC.getResolver('underDevelopment'),
    // viewerHPStaff: ViewerHPStaffTC.getResolver('HPStaffAccess'),
	}),
	...authAccess({sourceUserType: 'CHU'}, {
		CHUIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerCHU: PlaceHolderTC.getResolver('underDevelopment'),
    // viewerCHU: ViewerCHUTC.getResolver('CHUAccess'),
	}),
	...authAccess({sourceUserType: 'Benefactor', isActivated: true}, {
    isActivatedViewerBenefactor: ViewerBenefactorTC.getResolver('benefactorAccess'),
	}),
});

// Mutations
GQC.rootMutation().addFields({
	loginUser: UserTC.getResolver('loginWithEmail'),
	createBenefactorAccount: PlaceHolderTC.getResolver('underDevelopment'),
	...authAccess({sourceUserType: 'Benefactor'}, {
		sendBenefactorActivationLink: UserTC.getResolver('sendUserActivationLink'),
		// Update Profile Details etc.
		updateBenefactorDetails: UserTC.getResolver('updateById'),
		changeBenefactorAccountPassword: UserTC.getResolver('changePassword'),
		deactivateBenefactorAccount: PlaceHolderTC.getResolver('underDevelopment'),
		deleteBenefactorAccount: PlaceHolderTC.getResolver('underDevelopment'),
		createBenefactorAppointment: PlaceHolderTC.getResolver('underDevelopment')
	}),
	...authAccess({sourceUserType: 'HPStaff'}, {
		createTreatmentRecordHPS: PlaceHolderTC.getResolver('underDevelopment'),
		createPrescriptionHPS: PlaceHolderTC.getResolver('underDevelopment'),
		createBenefactorAppointment: PlaceHolderTC.getResolver('underDevelopment'),
	}),
	...authAccess({sourceUserType: 'CHU'}, {
		createTreatmentRecordCHU: PlaceHolderTC.getResolver('underDevelopment'),
		createPrescriptionCHU: PlaceHolderTC.getResolver('underDevelopment'),
		// createBenefactorAppointment: PlaceHolderTC.getResolver('underDevelopment'),
	}),
});

const schema = GQC.buildSchema();
module.exports = schema;
