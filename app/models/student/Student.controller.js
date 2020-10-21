var Student = require('./Student.model');

exports.create = function(req, res) {
    // Create and Save a new Student   
    var student = new Student({
        firstName:req.body.firstName, 
		lastName:req.body.lastName, 
		mobile:req.body.mobile, 
		dob:req.body.dob
    });

    student.save(function(err, data) {
        if (err) {
            res.status(err.status || 500).send({ message:  err.message, shortMessage:  err._message });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all Students from the database.
    Student.find(function(err, Students) {
        if (err) {
            res
            .status(500)
            .send({ message: 'Some error occurred while retrieving Students.' });
        } else {
            res.send(Students);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single Student with a StudentId
    Student.findById(req.params.StudentId, function(err, data) {
        if (err) {
            res
            .status(500)
            .send({
                message: 'Could not retrieve Student with id ' + req.params.StudentId
            });
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a Student identified by the StudentId in the request
    Student.findById(req.params.StudentId, function(err, student) {
        if (err || !student) {
            res
            .status(500)
            .send({
                message: 'Could not find a Student with id ' + req.params.StudentId
            });
        } else {      
            for(var key in student)
            {
                if (key in req.body){
                    student[key] = req.body[key];
                }
            }
        
            student.save(function(err, data) {
                if (err) {
                res
                    .status(500)
                    .send({
                    message: 'Could not update Student with id ' + req.params.StudentId
                    });
                } else {
                    res.send(data);
                }
            });
        }        
    });
};

exports.delete = function(req, res) {
    // Delete a Student with the specified StudentId in the request
    Student.deleteOne({ _id: req.params.StudentId }, function(err, data) {
        if (err) {
            res
            .status(500)
            .send({ message: 'Could not delete Student with id ' + req.params.StudentId });
        }else if (data.n == 0) {
            res
            .status(400)
            .send({ message: 'Could not find Student with id ' + req.params.StudentId });
        } else {
            res.send({ message: 'Student deleted successfully!' });
        }
    });
};
