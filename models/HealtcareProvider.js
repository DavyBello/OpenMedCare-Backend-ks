const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * HealthcareProvider Model
 * ==========
 */
const HealthcareProvider = new keystone.List('HealthcareProvider', {
    //track: true
});

HealthcareProvider.add({
  name: { type: String, required: true, index: true },
  address: { type: Types.Text, initial: true },
});


/**
 * Registration
 */
HealthcareProvider.defaultSort = 'name';
HealthcareProvider.defaultColumns = 'name, address';
HealthcareProvider.register();
