var keystone = require('keystone');
var Types = keystone.Field.Types;

const { PHONE_REGEX, toCamelCase  } = require('../lib/util');

/**
 * HealthcareRecord Model
 * ==========
 */
var HealthcareRecord = new keystone.List('HealthcareRecord',{
	// nocreate: true,
	noedit: true
});

HealthcareRecord.add('Tracking data',{
	createdAt: { type: Types.Datetime, default: Date.now, required: true, index: true },
	createdBy: { type: Types.Relationship, ref: 'User', initial: true, required: true, index: true },
	lastEditedAt: { type: Types.Datetime, index: true, noedit: true },
	lastEditedBy: { type: Types.Relationship, ref: 'User', index: true, noedit: true },
});

// Model Hooks
// HealthcareRecord.schema.pre('save', function (next) {
// 	if (this.isNew) {
//
// 	}
// });

/**
 * Relationships
 */
// HealthcareRecord.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
HealthcareRecord.defaultSort = '-createdAt';
HealthcareRecord.defaultColumns = 'createdBy, createdAt, lastEditedBy, lastEditedAt';
HealthcareRecord.register();
