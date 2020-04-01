import db from '../models';
import hashPassword from '../helpers/hashPassword';
import comparePassword from '../helpers/comparePassword';
import generateToken from '../helpers/generateToken';

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
            const dbResponse = await db.User.create({firstName, lastName, email, password:hashedPassword});
            //console.log(response);
            const user = {
                firstName: dbResponse.dataValues.firstName,
                lastName: dbResponse.dataValues.lastName,
                email: dbResponse.dataValues.email
            };
            res.status(201).json({
                message: 'successful',
                user,
                token: generateToken(user)
            });
            
        } catch (error) {
            //console.log(error)
            //const []
           res.status(400).json({
               message: error.errors[0].message
           });
        }
    }
    static async login(req, res) {
        
        try {
            const { email, password } = req.body;

            if(!(email && password)){
                res.status(400).json({
                    message: 'Please your email and password'
                });
                return;
            };

            const existingUser = await db.User.findOne({
                where: {
                    email
                }
            });
            if(!existingUser){
                res.status(404).json({
                    message: 'User does not exist'
                });
                return;
            };
            const storedHashedPassword = existingUser.dataValues.password;
            const passwordMatches = comparePassword(password,storedHashedPassword);
            if(passwordMatches){
                res.status(200).json({
                    message: 'successful'
                });
            } else {
                res.status(401).json({
                    message: 'Either password or username is incorrect'
                });
            };
            
        } catch (error) {
            res.status(400).json({
                message: error.errors
            })
            
        }
    }

}

export default AuthController;