import 'dotenv/config';

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send('Token não fornecido');

    const [, token ] = authHeader.split(' '); 

    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);

        req.userId = payload.userId;

        return next();
    } catch (err) {
        return res.status(401).send('Token invalido');
    }
};