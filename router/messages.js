const {Router}= require("express")
const { getChat } = require("../controller/messages")
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router()

router.get('/:to',validateJWT,getChat)




module.exports= router