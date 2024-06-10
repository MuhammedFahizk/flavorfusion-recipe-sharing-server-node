/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page
 *     responses:
 *       200:
 *         description: Returns the home page or the authenticated user's data
 */



/**
 * @swagger
 * /login:
 *   get:
 *     summary: Login page
 *     responses:
 *       200:
 *         description: Returns the login page
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */



/**
 * @swagger
 * /signup:
 *   get:
 *     summary: Sign up page
 *     responses:
 *       200:
 *         description: Returns the sign-up page
 */


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully signed up
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Profile page
 *     responses:
 *       200:
 *         description: Returns the profile of the authenticated user
 */


/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Add a new recipe
 *     description: Add a new recipe to the database
 *     tags:
 *       - Recipes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       '201':
 *         description: Recipe added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '400':
 *         description: Bad request. Validation errors or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the validation issues.
 *                   example: "title is required, prepTime must be a number"
 *       '500':
 *         description: Internal server error
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: string
 *         instructions:
 *           type: string
 *         prepTime:
 *           type: number
 *         cookTime:
 *           type: number
 *         servings:
 *           type: number
 *         category:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         image:
 *           type: string
 *         notes:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *     Recipe:
 *       allOf:
 *         - $ref: '#/components/schemas/RecipeInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The unique identifier of the recipe
 *             userId:
 *               type: string
 *               description: The ID of the user who added the recipe
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp when the recipe was created
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp when the recipe was last updated
 */



/**
 * @swagger
 * /recipe:
 *   put: 
 *     summary: Updating recipe
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: body
 *         name: recipe
 *         description: The recipe details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       200:
 *         description: Returns the profile of the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Bad request. Validation errors or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the validation issues.
 *                   example: "title is required, prepTime must be a number"
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: string
 *         instructions:
 *           type: string
 *         prepTime:
 *           type: number
 *         cookTime:
 *           type: number
 *         servings:
 *           type: number
 *         category:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         image:
 *           type: string
 *         notes:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *     Recipe:
 *       allOf:
 *         - $ref: '#/components/schemas/RecipeInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The unique identifier of the recipe
 *             userId:
 *               type: string
 *               description: The ID of the user who added the recipe
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp when the recipe was created
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp when the recipe was last updated
 */



/**
 * @swagger
 * /recipe/{userID}:
 *   get:
 *     summary: Get all recipes for a user
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get recipes for
 *     responses:
 *       200:
 *         description: Returns all recipes for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid userID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User ID is required.
 *       404:
 *         description: No recipes found for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No recipes found for this user.
 *       500:
 *         description: Internal server error
 */