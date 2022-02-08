const jwt = require('jsonwebtoken');
exports.generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
                if (err)
                    reject('Error al generar el token');
                else
                    resolve(token);
            });
    });
};

exports.compareJWT = (token = "") => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        return [true, uid];
    } catch (e) {
        return [false, null];
    }
}
