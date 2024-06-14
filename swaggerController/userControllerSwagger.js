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
 *     tags:
 *       - User
 *     summary: Login page
 *     responses:
 *       200:
 *         description: Returns the login page
 */


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
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
 *     tags:
 *       - User
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
 *     tags:
 *       - User
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
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Returns the profile of the authenticated user
 */



/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User Logout
 *     description: Logs out the authenticated user by clearing the refresh and access tokens.
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Logged out successfully"
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *     security:
 *       - bearerAuth: []
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
 *         name: recipeId
 *         description: the recipe ID for find recipe
 *         require: true
 *         schema:
 *           type: string
 *         example: '666a8c98ffe66cd022b45508'
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
 * /recipes/{userID}:
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


/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: User get all recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       '200':
 *         description: Return all recipes for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
* /recipe/{recipeID}:
*   delete:
*     summary: User delete Recipe
*     tags:
*       - Recipes
*     parameters:
*       - name: recipeID
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the recipe to delete
*     responses:
*       '200':
*         description: Recipe deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Recipe deleted successfully
*       '400':
*         description: Recipe ID is required
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Recipe ID is required
*       '404':
*         description: Recipe not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Recipe not found
*       '500':
*         description: Internal server error
*/

/**
 * @swagger
 * /recipes/search/{search}:
 *   get:
 *     summary: Search for recipes
 *     description: Search for recipes by title, description, or tags.
 *     tags:
*       - Recipes
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: The search term to filter recipes.
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *                
 *       500:
 *         description: Internal server error
 */