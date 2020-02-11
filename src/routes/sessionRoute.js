const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionController");

router.post("/login", controller.getToken);
/**
 * @api {post} /sessions Generates the access token for a registered user.
 * @apiName getToken
 * @apiGroup Login
 *
 * @apiSuccess {ObjectID} _id  User identifier.
 * @apiSuccess {String} email  User email.
 * @apiSuccess {String} token  Access token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "usuario": {
 *        "_id": "5df443dc723c8d312c564471",
 *        "email": "teste@email.com"
 *    },
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkzXVCJ9.eyJfaWQiOiI1ZGY0NDNkYzcyM2M4ZDMxMmM1NjQ0NzEiLCJpYXQiOjE1NzYzNjEyNTcsImV4cCI6MTU3Njc5MzI1N30.c1OF1KWFsf5c09Rj3xw9sxow17o0weOpoBv53mj0wAI"
 * }
 *
 * @apiError User-Not-Found The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized 
 *     {
 *       "error": "User not found"
 *     }
 * 
 * @apiError Invalid-Password Inputed password does not exists in database for this User.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized 
 *     {
 *       "error": "Password is not valid"
 *     }
 * 
 */


module.exports = router;