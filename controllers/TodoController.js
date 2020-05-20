import db from '../models';

class TodoController {
    static async createTodo(req, res) {
        try {
            const { title, description, date } = req.body;
            if(!(title && description)) {
                res.status(400).json({
                    message: 'Title and description are required'
                });
                return;
            };
            const { id } = req.user;
            const dbResponse = await db.Todo.create({ title, description, completed: false, date, userId: id});
            const todo = {
                title: dbResponse.dataValues.title,
                description: dbResponse.dataValues.description,
                date: dbResponse.dataValues.date,
                updatedAt: dbResponse.dataValues.updatedAt,
                createdAt: dbResponse.dataValues.createdAt,

            }
            res.status(201).json({
                todo
            });
        } catch(error) {
           res.status(500).json({
               message: 'Unable to create Memoir'
           })
        }
        
    }

    static async getUserTodos(req, res) {
        try {
            const { id } = req.user;
            const dbResponse = await db.Todo.findAll({
                where: {
                    userId: id
                },
                attributes: { 
                    exclude: ['userId'] 
                }
            });

            let result = dbResponse.map(todo => todo.dataValues);
            res.status(200).json(
                result
            )
            
        } catch(error) {
            res.status(500).json({
                message: 'Unable to get Memoirs for this user'
            })
           
        }
    }

    static async getTodo(req, res) {
        try {
            const { id } = req.params;
            const { id: userId } = req.user;
            const dbResponse = await db.Todo.findOne({
                where: {
                    id,
                    userId
                }
            });

            const todoItem = {
                title: dbResponse.dataValues.title,
                description: dbResponse.dataValues.description,
                completed: dbResponse.dataValues.completed,
                date: dbResponse.dataValues.date
            }
            res.status(200).json({
                todoItem
            })
        } catch(error) {
            res.status(500).json({
                message: 'An error occurred while fetching Memoir'
            })
        }
         
    }

    static async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { id: userId } = req.user;
            const { title, description, completed, date } = req.body;
            const dbResponse = await db.Todo.update({ title, description, completed, date },
                {
                    where: {
                        id,
                        userId
                    }
                }
            );
            const [success] = dbResponse;
            if(success === 1) {
                res.status(200).json({
                    message: 'success',
                    todo: {
                        title,
                        description,
                        completed,
                        date
                    }
                });
            }else{
                res.status(400).json({
                    message: 'Memoir was not updated'
                });
            }
        } catch(error) {
            res.status(500).json({
                message: 'Memoir could not be updated'
            });
        }
       
    }

    static async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const { id:userId } = req.user;
            const dbResponse = await db.Todo.destroy({
                where: {
                    id,
                    userId
                }
            });
            if(dbResponse === 1) {
                res.status(200).json({
                    message: 'Memoir was deleted successfully'
                });
            }else{
                res.status(400).json({
                    message: 'Unable to delete Memoir item'
                });
            }
            
        } catch(error) {
            res.status(500).json({
                message: 'Memoir could not be deleted'
            });
        }
    }


}


export default TodoController;