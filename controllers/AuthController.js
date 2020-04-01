import db from '../models';
import hashPassword from '../helpers/hashPassword';

class AuthController {
    static async signup(req, res) {
        //console.log(req.body);
        try {
            const { firstName, lastName,email, password } = req.body;
            if(!(password && email)) {
                res.status(400).json({
                    message: 'Email and password are required'
                });
                return;
            };
            const hashedPassword = await hashPassword(password);
            const response = await db.User.create({firstName, lastName, email, password:hashedPassword});
            //console.log(response);
            const user = {
                firstName: response.dataValues.firstName,
                lastName: response.dataValues.lastName,
                email: response.dataValues.email
            };
            res.status(200).json({
                status: 'successful',
                user
            });
            
        } catch (error) {
            //console.log(error)
            //const []
           res.json({
               message: error.errors[0].message
           });
        }
    }

}

export default AuthController;