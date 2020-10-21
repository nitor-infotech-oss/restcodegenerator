var fs = require("fs");
var allRoutes = []

function readConfigFile() {
    let rawdata = fs.readFileSync('./config/entity_config.json');
    return JSON.parse(rawdata);
}

function createFolderStructure() {
    var entities = readConfigFile()
    var dir = ["./app", "./app/models"];
    entities.forEach(function (element) {
        dir.push("./app/models/" + element.name);
    }, this);
    dir.forEach(function (element) {
        if (!fs.existsSync(element)) {
            fs.mkdirSync(element, 0744);
        }
    }, this);
}

function getFormaterFields(fields) {
    return fields;
}

function createModels() {
    var entities = readConfigFile()
    entities.forEach(function (element) {
        var modelData = `var mongoose = require('mongoose');

var ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `Schema = mongoose.Schema(
    ` + JSON.stringify(getFormaterFields(element.fields)).replace(/"/g, '').split(",").join(", ") + `,
    {
        timestamps: true
    }
);

module.exports = mongoose.model('` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `', ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `Schema);`;
        fs.writeFile("./app/models/" + element.name + "/" + element.name + ".model.js", modelData, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Created " + element.name + ".model.js");
        });
    }, this);
}

function createRoutes() {
    var entities = readConfigFile()
    entities.forEach(function (element) {
        var routesData = `module.exports = function(app) {
var ` + element.name + `s = require('./` + element.name + `.controller.js');


/**
 * @swagger
 * /` + element.name + `s:
 *   post:
 *     summary: Add ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `
 *     description: Add ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `s to the list
 *     tags:
 *       - ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `
 *     parameters:
 *       - name: `+ element.name +`
 *         description: `+ element.name +` object
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *     responses:
 *       200:
 *         description: Adds the ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` in body
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'Added'
 */
    app.post('/` + element.name + `s', ` + element.name + `s.create);

    
/**
 * @swagger
 * '/` + element.name + `s':
 *   get:
 *     summary: Get all ` + element.name + `
 *     tags: [` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `]
 *     description: Returns the ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `s
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: // Retrieve and return all ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `s from the database.
 */

    app.get('/` + element.name + `s', ` + element.name + `s.findAll);

    /**
     * @swagger
     * path:
     *  /` + element.name + `s/{` + element.name + `Id}:
     *    get:
     *      summary: Get a ` + element.name + ` by id
     *      tags: [` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `]
     *      parameters:
     *        - in: path
     *          name: ` + element.name + `Id
     *          type: string
     *          required: true
     *          description: Id of the ` + element.name + `
     *      responses:
     *        200:
     *          description: An ` + element.name + `s object             
     */
    // Retrieve a single ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` with ` + element.name + `Id
    app.get('/` + element.name + `s/:` + element.name + `Id', ` + element.name + `s.findOne);

    /**
     * @swagger
     * path:
     *  /` + element.name + `s/{` + element.name + `Id}:
     *   put:
     *     summary: Update ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `
     *     description: Update ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` item
     *     tags:
     *       - ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `
     *     parameters:
     *       - name: `+ element.name +`
     *         description: `+ element.name +` object
     *         in: body
     *         required: true
     *         schema:
     *          type: object
     *       - name: ` + element.name + `Id
     *         in: path
     *         type: string
     *         required: true
     *         description: Id of the ` + element.name + `
     *     responses:
     *       200:
     *         description: Adds the ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` in body
     *         schema:
     *           type: object
     *           properties:
     *             message:
     *               type: string
     *               default: 'Added'
     */
    
    // Update a ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` with ` + element.name + `Id
    app.put('/` + element.name + `s/:` + element.name + `Id', ` + element.name + `s.update);

    /**
     * @swagger
     * path:
     *  /` + element.name + `s/{` + element.name + `Id}:
     *    delete:
     *      summary: Delete a ` + element.name + ` by id
     *      tags: [` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `]
     *      parameters:
     *        - in: path
     *          name: ` + element.name + `Id
     *          type: string
     *          required: true
     *          description: Id of the ` + element.name + `
     *      responses:
     *        200:
     *          description: An ` + element.name + `s object             
     */
    // Delete a ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` with ` + element.name + `Id
    app.delete('/` + element.name + `s/:` + element.name + `Id', ` + element.name + `s.delete);
};`;
        fs.writeFile("./app/models/" + element.name + "/" + element.name + ".routes.js", routesData, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Created " + element.name + ".routes.js");
        });
    }, this);
}


function createControllers() {
    var entities = readConfigFile()
    entities.forEach(function (element) {
        var bodyFields = ''
        var fieldCount = 0
        Object.keys(element.fields).forEach(function (key) {
            if (fieldCount == 0) {
                bodyFields = key + ":req.body." + key
            } else {
                bodyFields = bodyFields + ", \r\n\t\t" + key + ":req.body." + key
            }
            fieldCount = fieldCount + 1
        });


        var controllerData = `var ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` = require('./` + element.name + `.model');

exports.create = function(req, res) {
    // Create and Save a new ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `   
    var ` + element.name.toLowerCase() + ` = new ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `({
        ` + bodyFields + `
    });

    ` + element.name.toLowerCase() + `.save(function(err, data) {
        if (err) {
            res.status(err.status || 500).send({ message:  err.message, shortMessage:  err._message });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all ` + element.name + `s from the database.
    ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `.find(function(err, ` + element.name + `s) {
        if (err) {
            res
            .status(500)
            .send({ message: 'Some error occurred while retrieving ` + element.name + `s.' });
        } else {
            res.send(` + element.name + `s);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single ` + element.name + ` with a ` + element.name + `Id
    ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `.findById(req.params.` + element.name + `Id, function(err, data) {
        if (err) {
            res
            .status(500)
            .send({
                message: 'Could not retrieve ` + element.name + ` with id ' + req.params.` + element.name + `Id
            });
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a ` + element.name + ` identified by the ` + element.name + `Id in the request
    ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `.findById(req.params.` + element.name + `Id, function(err, ` + element.name.toLowerCase() + `) {
        if (err || !` + element.name.toLowerCase() + `) {
            res
            .status(500)
            .send({
                message: 'Could not find a ` + element.name + ` with id ' + req.params.` + element.name + `Id
            });
        } else {      
            for(var key in ` + element.name.toLowerCase() + `)
            {
                if (key in req.body){
                    ` + element.name.toLowerCase() + `[key] = req.body[key];
                }
            }
        
            ` + element.name.toLowerCase() + `.save(function(err, data) {
                if (err) {
                res
                    .status(500)
                    .send({
                    message: 'Could not update ` + element.name + ` with id ' + req.params.` + element.name + `Id
                    });
                } else {
                    res.send(data);
                }
            });
        }        
    });
};

exports.delete = function(req, res) {
    // Delete a ` + element.name + ` with the specified ` + element.name + `Id in the request
    ` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + `.deleteOne({ _id: req.params.` + element.name + `Id }, function(err, data) {
        if (err) {
            res
            .status(500)
            .send({ message: 'Could not delete ` + element.name + ` with id ' + req.params.` + element.name + `Id });
        }else if (data.n == 0) {
            res
            .status(400)
            .send({ message: 'Could not find ` + element.name + ` with id ' + req.params.` + element.name + `Id });
        } else {
            res.send({ message: '` + element.name.charAt(0).toUpperCase() + element.name.substr(1).toLowerCase() + ` deleted successfully!' });
        }
    });
};
`;
        fs.writeFile("./app/models/" + element.name + "/" + element.name + ".controller.js", controllerData, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Created " + element.name + ".controller.js");
        });
    }, this);
}


function createAppRoute() {
    var entities = readConfigFile()
    var routeFileData = 'module.exports = function(app) {\n';
    entities.forEach(function (element) {
        routeFileData += `\trequire('./models/` + element.name + `/` + element.name + `.routes')(app);\n`
        allRoutes.push(`./app/models/` + element.name + `/` + element.name + `.routes.js`)
    }, this);
    routeFileData += '};'
    fs.writeFile("./app/app.routes.js", routeFileData, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Created app.routes.js");
    });
}

function createServer() {
    var serverData = `var express = require('express');
    var bodyParser = require('body-parser');
    var dbconnection = require('./models/database.connect');
    var swaggerUi = require('swagger-ui-express');
    var swaggerJsDoc = require('swagger-jsdoc');
    var YAML = require('json2yaml');
    
    const PORT = process.env.PORT || 3000;

    // create express app
    var app = express();

    // connect to database
    dbconnection();


    const swaggerDefinition = {
        info: {
          title: 'REST API Code Generator', 
          version: '1.0.0', 
          description: '<!DOCTYPE html><html><head><style>table, th, td { border: 1px solid black; border-collapse: collapse;}th, td { padding: 5px; text-align: left; }</style></head><body><p>You can download swagger doc here</p><table style="width:00px">  <tr> <td><a href="http://localhost:3000/swaggerdoc?type=json">See JSON</a></td> <td><a href="http://localhost:3000/swaggerdoc?type=ymal">See YMAL</a></td> </tr></table></body></html>', 
          termsOfService: 'http://swagger.io/terms/', 
          contact: {
            email: 'ssmali1505@gmail.com'
          },
          license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
          }        
        },
          securityDefinitions: {
            bearerAuth: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
          },
      };
      
      // Options for the swagger docs
      const swaggerOptions = {
        // Import swaggerDefinitions
        swaggerDefinition,
        // Path to the API docs
        // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
        apis: [` + allRoutes.map(d => `'${d}'`).join(',') + `],
      };
  
    const swaggerDoc  =  swaggerJsDoc(swaggerOptions);  
    
    // timeout handle
    app.use(function(req, res, next){
        res.setTimeout(3000, function(){
          res.send({'error':'api timeout'});
        });
        next();
    });
  
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    // Export swagger json
    app.get('/swaggerdoc', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        let type = req.query.type;
        if (type == "yaml"){
          ymlText = YAML.stringify(swaggerDoc);
          res.send(ymlText);
        }else{
          res.send(swaggerDoc);
        }
    });

    // swagger document add
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
   
    // adding all the routes
    require('./app.routes')(app);
    
    // define a simple route
    app.get('/', function(req, res) {
      res.send('Welcome in REST api');
    });
    
    // listen for requests
    app.listen( PORT , function() {
      console.log('Server is listening on port : ' +  PORT );
    });
    `;
    fs.writeFile("./app/server.js", serverData, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Created server.js");
    });
}

function createDatabaseConnectionFile() {
    var databaseConnectionFile = `var dbConfig = require('../../config/database.config.js');
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
    `;
    fs.writeFile("./app/models/database.connect.js", databaseConnectionFile, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Created database.connect.js");
    });
}

createFolderStructure();
createModels();
createControllers()
createRoutes()
createAppRoute()
createServer()
createDatabaseConnectionFile()