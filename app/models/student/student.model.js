var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema(
    {firstName:{type:String, required:true}, lastName:{type:String, required:true}, mobile:{type:String, required:true}, dob:{type:Date}},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Student', StudentSchema);