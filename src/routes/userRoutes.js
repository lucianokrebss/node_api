const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

//Rotas

//Register User
router.post("/signup", controller.postSignup);
/**
 * @api {post} /signup Register new user.
 * @apiName User-SignUp
 * @apiGroup Users
 * 
 * @apiParam {String} email       Email is required.
 * @apiParam {String} password       Password is required.
 *
 * @apiSuccess {String} _id The new Users-ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "User successfully registered"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Error saving the user"
 *     }
 */

router.use(authMiddleware) //everything under this line needs a token
/**
 * @api {middleware}  Middleware to verify token.
 * @apiName Token-middleware
 * @apiGroup Token-middleware
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} other-param       Any other param sent in a request.
 *
 * @apiSuccess {String} Ok Allow sending requests.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       error:  error: "Token not provided"
 *     }
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       error:  error: "Token not valid"
 *     }
 */

//CPF
router.post("/CPF/:id", controller.postCPF);
/**
 * @api {post} /CPF/:id Register CPF in User(ID).
 * @apiName Post-CPF
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} cpf       CPF is required.
 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error saving User's CPF"
 *     }
 */

// //FullName
router.post("/fullname/:id", controller.postFullnamePerUser);
/**
 * @api {post} /fullname/:id Register username in User(ID).
 * @apiName Post-Username
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} fullName       User fullname is required.
 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error to adding user's name"
 *     }
 */

// //Birthday
router.post("/birthday/:id", controller.postBdayPerUser);
/**
 * @api {post} /birthday/:id Register user's birthday in User(ID).
 * @apiName Post-User-Birthday
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} birthday       User's birthday is required.
 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error adding User's birthday."
 *     }
 */

// //Phone Number
router.post("/phone/:id", controller.postPhonePerUser);
/**
 * @api {post} /phone/:id Register user's phone number in User(ID).
 * @apiName Post-User-PhoneNumber
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} data       User's phone number is required.
 * @apiParam {Date} updatedAT       Timestamp for when occurred the last update.

 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error adding User's phone Number."
 *     }
 */

// //Address
router.post("/address/:id", controller.postAddressPerUser);
/**
 * @api {post} /address/:id Register user's address in User(ID).
 * @apiName Post-User-Address
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} cep       User's postal code. It will auto-complete the fields for: street, city, state.
 * @apiParam {String} number       User's address number.
 * @apiParam {String} complement       User's address complement.
 * @apiParam {Date} updatedAT       Timestamp for when occurred the last update.
 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error adding User's address."
 *     }
 */

// //Amount Requested
router.post("/amount/:id", controller.postRequestedAmount);
/**
 * @api {post} /amount/:id Register user's requested amount (cents) in User(ID).
 * @apiName Post-User-Requested-Amount
 * @apiGroup Users
 * 
 * @apiParam {String} authorization       Send Token in the body of the request.
 * @apiParam {String} requestedAmount       User's requested amount in cents.
 *
 * @apiSuccess {String} _id Unique User identifier.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        success: true
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       error: "Error adding User's requested amount."
 *     }
 */


module.exports = router;