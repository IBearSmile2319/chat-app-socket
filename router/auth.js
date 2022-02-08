


const {Router}= require("express")
const { createUser, signIn, renewToken } = require("../controller/auth")
const { validate } = require("../middlewares/validate")
const { validateJWT } = require("../middlewares/validate-jwt")
const { validateLogin, validateRegister } = require("../utils/validator")

const router= Router()

router.post('/register',validateRegister,validate,createUser)

router.post('/login',validateLogin,validate,signIn )

router.get('/renew',validateJWT,renewToken)




module.exports= router