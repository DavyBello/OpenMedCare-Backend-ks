const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * LocalGovernment Model
 * ==========
 */
const LocalGovernment = new keystone.List('LocalGovernment', {
    //track: true
});

LocalGovernment.add({
  name: { type: String, initial: true, index: true, required: true },
});

LocalGovernment.relationship({ ref: 'State', path: 'state', refPath: 'locals' });
/**
 * Registration
 */
LocalGovernment.defaultColumns = 'name';
LocalGovernment.register();
