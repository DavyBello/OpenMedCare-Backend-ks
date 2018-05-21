const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * BenefactorType Model
 * ==========
 */
const BenefactorType = new keystone.List('BenefactorType', {
    //track: true
});

BenefactorType.add({
  name: { type: String, initial: true, index: true, required: true },
});

BenefactorType.relationship({ ref: 'Benefactor', path: 'benefactors', refPath: 'type' });
/**
 * Registration
 */
BenefactorType.defaultColumns = 'name';
BenefactorType.register();
