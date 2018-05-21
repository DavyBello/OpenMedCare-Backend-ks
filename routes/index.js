const keystone = require('keystone');
// const middleware = require('./middleware');
// const importRoutes = keystone.importer(__dirname);

// Common Middleware
// keystone.pre('routes', middleware.initLocals);
// keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
// const routes = {
// 	views: importRoutes('./views'),
// };

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/admin', (req, res) => {res.redirect('/keystone')});
	app.get('/', (req, res) => {res.redirect('/keystone')});
};
