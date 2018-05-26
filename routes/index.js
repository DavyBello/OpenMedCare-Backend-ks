const keystone = require('keystone');
// const { ApolloServer } = require('apollo-server');
// const { registerServer } = require('apollo-server-express');
const cors = require('cors');
const schema = require('../graphql/schema-compose');
const jwt = require('express-jwt');

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const User = keystone.list('User').model;

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/admin', (req, res) => {res.redirect('/keystone')});
	app.get('/', (req, res) => {res.redirect('/keystone')});

	// Old method to add GraphQL
	app.use('/graphql', cors(), bodyParser.json(),jwt({
	  secret: process.env.JWT_SECRET,
	  credentialsRequired: false,
	}), graphqlExpress(req=>({
		schema,
		context: {
			user: req.user ? User.findOne({ _id: req.user._id || req.user.id, version: req.user.version}) : Promise.resolve(null)
		}
	 })));
	app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

	// New method to add GraphQL
	// const server = new ApolloServer({
	// 	schema
	// });
	// registerServer({ server, app });
};
