const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * State Model
 * ==========
 */
const State = new keystone.List('State', {
    //track: true
});

State.add({
  name: { type: String, required: true, index: true },
  locals: { type: Types.Relationship, ref: 'LocalGovernment', many: true },
});


/**
 * Registration
 */
State.defaultSort = 'name';
State.defaultColumns = 'name, locals';
State.register();
