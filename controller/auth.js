const User = require('../models/user')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        // verificar si existe el email
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist'
            })
        }
        const user = new User({ name, email, password })
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Grabar usuario
        await user.save()

        // Generar JWT
        const token = await generateJWT(user.id)


        res.status(200).json({
            ok: true,
            msg: 'createUser',
            user,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            message: "Hable con el administrador"
        })
    }
}

// login
exports.signIn = async (req, res, next) => {

    try {
        const { email, password } = req.body
        // verificar si existe el email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        // verificar password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password incorrect'
            })
        }
        // Generar JWT
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok: true,
            msg: 'signIn',
            user,
            token
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}
// renewToken
exports.renewToken = async (req, res, next) => {
    try {
        const { uid } = req
        // Generar new JWT
        const token = await generateJWT(uid)

        // Obtener usuario for UID
        const user = await User.findById(uid)


        res.status(200).json({
            ok: true,
            msg: 'renewToken',
            user,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

