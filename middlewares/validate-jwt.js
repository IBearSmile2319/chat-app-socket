const jwt = require('jsonwebtoken');
exports.validateJWT = (req, res, next) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No token provided'

            })
        }
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next()
    } catch (e) {
        res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
}