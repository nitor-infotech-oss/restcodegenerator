module.exports = function(app) {
	require('./models/Customer/Customer.routes')(app);
	require('./models/Student/Student.routes')(app);
};