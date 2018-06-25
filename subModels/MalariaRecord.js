const keystone = require('keystone');
const Types = keystone.Field.Types;

const { STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase  } = require('../lib/util');

const RDT_RESULTS = ['R','NR','INV']
/**
 * MalariaRecord Model
 * ==========
 */
const MalariaRecord = new keystone.List('MalariaRecord', {
	inherits: keystone.list('HealthcareRecord')
});

MalariaRecord.add('Malaria Record', {
	medCareId: { type: Types.Text, initial: false, required: true},
	// phone: { type: Types.Text, initial: true, sparse: true, unique: true, index: true, required: true },
}, 'Details', {
	labId: { type: Types.Text, initial: true },
	rdtResult: {type: Types.Select, options: RDT_RESULTS, initial: true},
}, 'Kit details', {
	lotNumber: { type: Types.Text, initial: true },
	expiryDate: { type: Types.Date, initial: true },
}, 'Tester', {
	testerName: { type: Types.Text, initial: true },
	comment: { type: Types.Html, wysiwyg: true, height: 400 },
});

/**
 * Relationships
 */
// MalariaRecord.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
MalariaRecord.defaultSort = '-createdAt';
MalariaRecord.defaultColumns = 'medCareId, testerName, comment, createdBy, createdAt';
MalariaRecord.register();
