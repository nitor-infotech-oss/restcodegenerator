var express = require('express');
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
        apis: ['./app/models/Customer/Customer.routes.js','./app/models/Student/Student.routes.js'],
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
    