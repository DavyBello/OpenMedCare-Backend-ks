const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');
// const { TypeComposer, InputTypeComposer  } = require('graphql-compose');

/**
* Mongoose Models
*/
const User = keystone.list('User').model;

/**
* Config
*/
const secretFields = ['password', 'passwordVersion','isAdmin']
const UserTCOptions = {
  fields:{
    remove: [...secretFields]
  }
};
const BenefactorTCOptions = {
  fields:{
    remove: [...secretFields]
  }
};

/**
* Exports
*/
const UserTC = exports.UserTC = composeWithMongoose(User, UserTCOptions);
const BenefactorTC = exports.BenefactorTC = composeWithMongoose(User, BenefactorTCOptions);

/**
* Add JWT to user models for login
*/
UserTC.addFields({jwt: 'String'})
BenefactorTC.addFields({jwt: 'String'})
