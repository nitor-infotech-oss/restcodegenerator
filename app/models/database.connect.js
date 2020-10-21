var dbConfig = require('../../config/database.config.js');
var mongoose = require('mongoose');    
module.exports = function(app) {
    mongoose.connect(dbConfig.url, function(err) {
        if (err) {
            console.log("Error in MongoDb connection:", err);
            throw err;
        }else{
            promiseLibrary: global.Promise,
            mongoose.set('debug', true);
        }
    });
};
    