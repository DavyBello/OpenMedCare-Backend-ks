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
		hpsIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewerHPStaff: PlaceHolderTC.getResolver('underDevelopment'),
    // viewerHPStaff: ViewerHPStaffTC.getResolver('HPStaffAccess'),
	}),
	...authAccess({sourceUserType: 'CHU'}, {
		chuIsAuthenticated: UserTC.getResolver('isAuthenticated'),
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
	benefactorCreateAccount: PlaceHolderTC.getResolver('underDevelopment'),
	...authAccess({sourceUserType: 'Benefactor'}, {
		benefactorSendActivationLink: UserTC.getResolver('sendUserActivationLink'),
		// Update Profile Details etc.
		benefactorUpdateSelf: updateSelf({TC: BenefactorTC}),
		benefactorChangeAccountPassword: UserTC.getResolver('changePassword'),
		benefactorDeactivateAccount: PlaceHolderTC.getResolver('underDevelopment'),
		benefactorDeleteAccount: PlaceHolderTC.getResolver('underDevelopment'),
		benefactorCreateAppointment: PlaceHolderTC.getResolver('underDevelopment')
	}),
	...authAccess({sourceUserType: 'HPStaff'}, {
		hpsCreateTreatmentRecord: PlaceHolderTC.getResolver('underDevelopment'),
		hpsCreatePrescription: PlaceHolderTC.getResolver('underDevelopment'),
		hpsCreateBenefactorAppointment: PlaceHolderTC.getResolver('underDevelopment'),
	}),
	...authAccess({sourceUserType: 'CHU'}, {
		chuCreateTreatmentRecord: PlaceHolderTC.getResolver('underDevelopment'),
		chuCreatePrescription: PlaceHolderTC.getResolver('underDevelopment'),
		// createBenefactorAppointment: PlaceHolderTC.getResolver('underDevelopment'),
	}),
});

const schema = GQC.buildSchema();
module.exports = schema;
