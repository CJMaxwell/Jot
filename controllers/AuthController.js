import db from '../models';
import hashPassword from '../helpers/hashPassword';
import comparePassword from '../helpers/comparePassword';
import generateToken from '../helpers/generateToken';

class AuthController {
    static async signup(req, res) {
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
            const user = {
                id: dbResponse.dataValues.id,
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
            const loggedInUser = {
                id: existingUser.dataValues.id,
                firstName: existingUser.dataValues.firstName,
                lastName: existingUser.dataValues.lastName,
                email: existingUser.dataValues.email
            };
            const storedHashedPassword = existingUser.dataValues.password;
            const passwordMatches = comparePassword(password,storedHashedPassword);
            if(passwordMatches){
                res.status(200).json({
                    message: 'successful',
                    user: loggedInUser,
                    token: generateToken(loggedInUser)
                });
            } else {
                res.status(401).json({
                    message: 'Either password or username is incorrect'
                });
            };
            
        } catch (error) {
            res.status(500).json({
                message: error.errors
            })
            
        }
    }

    static async updateUser(req, res){
        try {
            const { firstName, lastName } = req.body;
            const { id } = req.params;
            const dbResponse = await db.User.update({ firstName, lastName },
                {
                    where: {
                        id
                    }
                }
            );
            const [success] = dbResponse;
            if(success === 1){
                res.status(200).json({
                    message: 'User updated successfully',
                    user: {
                        firstName,
                        lastName
                    }
                });
            }else {
                res.status(400).json({
                    message: 'Unable to update user details'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.errors
            })
        }
    }

    static async deleteUser(req, res){
        try {
            const { id } = req.params;
            const dbResponse = await db.User.destroy({
                where: {
                    id
                }
            });
            if(dbResponse === 1){
                res.status(200).json({
                    message: 'User deleted sucessfully'
                });
            }else{
                res.status(400).json({
                    message: 'Unable to delete user'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.errors
            })
        }
    }

}

export default AuthController;