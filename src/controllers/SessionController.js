import 'dotenv/config';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/User";

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).send('User not found');

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordCorrect)
            return res.status(401).send('Wrong password');

        const token = jwt.sign({ userId: user._id}, process.env.APP_SECRET, {
            expiresIn: '7d'
        })
        
        return (
            res.json({
                token: token,
            })
        )

    }

    async verification(req, res) {
        //const { token } = req.body;
        const authHeader = req.headers.authorization;
        const [, token ] = authHeader.split(' ');

        if (token) {
            try {
                const payload = jwt.verify(token, process.env.APP_SECRET);

                const user = await User.findOne({ _id: payload.userId });

                if(user) {
                    return (
                        res.json({
                            id: user._id
                        })
                    )
                } else {
                    return res.status(404).send('User not found');
                }
            } catch (err) {
                return res.status(401).send('Token invalido');
            }
            
        }
    }
}

export default new SessionController();