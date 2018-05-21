const keystone = require('keystone');
const async = require('async');
const State = keystone.list('State');
const LocalGovernment = keystone.list('LocalGovernment');

const states = require('./data/nigeria-states');

let createState = (state, done)=>{
	let ids = []
	let stateName = state.state.name;

	state.state.locals.forEach((local)=>{
		let newLocalGovernment = new LocalGovernment.model({name: local.name});
		newLocalGovernment.save(function (err, localGov) {
			if (err) {
				console.error('Error adding lG: ' + dataItem.name + ' to the database:');
				console.error(err);
			} else {
				ids.push(localGov._id);
				if (ids.length === state.state.locals.length) {
		 	 		let newState = new State.model({name: stateName, locals: ids});
					newState.save((err)=>{
						if (err) {
							console.log(err);
						} else {
							done(err);
						}
					})
		 	 	}
			}
		})
	})
}

exports = module.exports = function (done) {
	async.forEach(states, createState, done);
};
