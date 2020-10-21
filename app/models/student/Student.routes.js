module.exports = function(app) {
var Students = require('./Student.controller.js');


/**
 * @swagger
 * /Students:
 *   post:
 *     summary: Add Student
 *     description: Add Students to the list
 *     tags:
 *       - Student
 *     parameters:
 *       - name: Student
 *         description: Student object
 *         in: body
 *         required: true
 *         schema:
 *          type: object
 *     responses:
 *       200:
 *         description: Adds the Student in body
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'Added'
 */
    app.post('/Students', Students.create);

    
/**
 * @swagger
 * '/Students':
 *   get:
 *     summary: Get all Student
 *     tags: [Student]
 *     description: Returns the Students
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: // Retrieve and return all Students from the database.
 */

    app.get('/Students', Students.findAll);

    /**
     * @swagger
     * path:
     *  /Students/{StudentId}:
     *    get:
     *      summary: Get a Student by id
     *      tags: [Student]
     *      parameters:
     *        - in: path
     *          name: StudentId
     *          type: string
     *          required: true
     *          description: Id of the Student
     *      responses:
     *        200:
     *          description: An Students object             
     */
    // Retrieve a single Student with StudentId
    app.get('/Students/:StudentId', Students.findOne);

    /**
     * @swagger
     * path:
     *  /Students/{StudentId}:
     *   put:
     *     summary: Update Student
     *     description: Update Student item
     *     tags:
     *       - Student
     *     parameters:
     *       - name: Student
     *         description: Student object
     *         in: body
     *         required: true
     *         schema:
     *          type: object
     *       - name: StudentId
     *         in: path
     *         type: string
     *         required: true
     *         description: Id of the Student
     *     responses:
     *       200:
     *         description: Adds the Student in body
     *         schema:
     *           type: object
     *           properties:
     *             message:
     *               type: string
     *               default: 'Added'
     */
    
    // Update a Student with StudentId
    app.put('/Students/:StudentId', Students.update);

    /**
     * @swagger
     * path:
     *  /Students/{StudentId}:
     *    delete:
     *      summary: Delete a Student by id
     *      tags: [Student]
     *      parameters:
     *        - in: path
     *          name: StudentId
     *          type: string
     *          required: true
     *          description: Id of the Student
     *      responses:
     *        200:
     *          description: An Students object             
     */
    // Delete a Student with StudentId
    app.delete('/Students/:StudentId', Students.delete);
};