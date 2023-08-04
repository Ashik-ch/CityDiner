import { Router } from 'express'
import { Users } from '../data';
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/login', (req, res) => {
    // const body = req.body;
    // const user = Users.filter(user => user.email == body.email && user.password == body.password })

    const { email, password } = req.body;    	        //Destructing method
    const validUser = Users.find(user => user.email === email && user.password === password);
    if (validUser) {
        res.send(jwtokenGenearate(validUser))
    }
    else {
        res.status(400).send({ msg: "Invalid paasword or Email" })
    }
})

const jwtokenGenearate = (User: any) => {
    const token = jwt.sign({
        email: User.email, isAdmin: User.isAdmin
    }, "SecretRandomKey", { expiresIn: '30d' })

    User.token = token
    return User;
}

export default router;