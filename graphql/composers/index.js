const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
const { GQC } = require('graphql-compose');
// const { TypeComposer, InputTypeComposer  } = require('graphql-compose');

/**
* Mongoose Models
*/
const User = keystone.list('User').model;
const Benefactor = keystone.list('Benefactor').model;
const BenefactorType = keystone.list('BenefactorType').model;

/**
* Config
*/
const secretFields = ['password', 'passwordVersion', 'isAdmin']
const UserTCOptions = {
  fields:{
    remove: [...secretFields]
  },
  resolvers:{
    updateById: {
      record: {
        removeFields: [...secretFields, 'phone']
      }
    }
  }
};
const BenefactorTCOptions = {
  fields:{
    remove: [...secretFields]
  },
  resolvers:{
    updateById: {
      record: {
        removeFields: [...secretFields, 'phone']
      }
    }
  }
};

/**
* Exports
*/
const UserTC = exports.UserTC = composeWithMongoose(User, UserTCOptions);
const BenefactorTC = exports.BenefactorTC = composeWithMongoose(Benefactor, BenefactorTCOptions);
const BenefactorTypeTC = exports.BenefactorTypeTC = composeWithMongoose(BenefactorType);

// console.log(UserTC);

/**
* Add JWT to user models for login/signUp
*/
UserTC.addFields({jwt: 'String'})
// BenefactorTC.addFields({jwt: 'String'})

/**
* Viewer Fields for authentication and authorization
*/
const ViewerBenefactorTC = exports.ViewerBenefactorTC = GQC.getOrCreateTC('ViewerBenefactor');
