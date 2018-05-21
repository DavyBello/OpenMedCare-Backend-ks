const keystone = require('keystone');
const Types = keystone.Field.Types;

const { STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase  } = require('../lib/util');

/**
 * Benefactor Model
 * ==========
 */
const Benefactor = new keystone.List('Benefactor');

Benefactor.add({
	name: { type: Types.Name, required: true, index: true },
	medCareId: { type: Types.Text, initial: false},
	email: { type: Types.Email, initial: false, sparse: true, unique: true, index: true },
	phone: { type: Types.Text, initial: true, sparse: true, unique: true, index: true },
	// password: { type: Types.Password, initial: true, required: true },
}, 'Details', {
	sex: {type: Types.Select, options: GENDERS, initial: true},
	address: { type: Types.Text, initial: true },
	// stateOfResidence: {type: Types.Select, options: STATES, initial: true},
	// state: { type: Types.Relationship, ref: 'State', many: false, initial: true },
	// lga: {type: Types.Select, options: STATES, display: "Local Government", initial: true},
	localGovernment: { type: Types.Relationship, ref: 'LocalGovernment', many: false, initial: true },
	dateOfBirth: { type: Types.Date, initial: true },
	// placeOfBirth: { type: Types.Text, initial: true},
	// nationality: { type: Types.Text, initial: true},
	stateOfOrigin: { type: Types.Text, initial: false},
}, 'Type', {
	type: { type: Types.Relationship, ref: 'BenefactorType', many: false, initial: true }
});

// Model Hooks
Benefactor.schema.pre('save', function (next) {
  this.name.first = toCamelCase(this.name.first);
  this.name.last = toCamelCase(this.name.last);
  if (PHONE_REGEX.test(this.phone)){
    next();
  } else {
		next(new Error('Invalid Phone Number'));
	}
});

/**
 * Relationships
 */
// Benefactor.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Benefactor.defaultColumns = 'name, phone, sex, dateOfBirth, state';
Benefactor.register();
