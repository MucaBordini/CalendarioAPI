import User from "../models/User";

class UserController {
    async store(req, res) {
        const { name, email, dateOfBirth, password } = req.body;

        await User.create({
            name,
            email,
            dateOfBirth,
            password,
        }).then(user => {
            const { _id } = user
    
            return res.json({ _id });
        }).catch(error => {
            if (error.code === 11000) 
                return res.status(405).send('E-mail already registered!');
            else
                return res.status(405).send('Erro desconhecido');
        });
    }
}

export default new UserController();