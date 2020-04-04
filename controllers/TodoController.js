import db from '../models';

class TodoController {
    static async createTodo(req, res) {
        try {
            const { title, description } = req.body;
            if(!(title && description)) {
                res.status(400).json({
                    message: 'Title and description are required'
                });
                return;
            };
            const { id } = req.user;
            const dbResponse = await db.Todo.create({ title, description, completed: false,userId: id});
            const todo = {
                title: dbResponse.dataValues.title,
                description: dbResponse.dataValues.description,
                updatedAt: dbResponse.dataValues.updatedAt,
                createdAt: dbResponse.dataValues.createdAt,

            }
            res.status(201).json({
                todo
            });
        } catch(error) {
           res.status(500).json({
               message: 'Unable to create Todo'
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
                message: 'Unable to get Todos for user'
            })
           
        }
    }

    static async getTodo(req, res) {
        try {
            const { id } = req.user;
            const { id: userId } = req.params;
            const dbResponse = await db.Todo.findOne({
                where: {
                    id,
                    userId
                }
            });
            //console.log(dbResponse);

            const todoItem = {
                title: dbResponse.dataValues.title,
                description: dbResponse.dataValues.description,
                completed: dbResponse.dataValues.completed
            }
            res.status(200).json({
                todoItem
            })
        } catch(error) {
            res.status(500).json({
                message: 'An error occurred while fetching Todo'
            })
        }
         
    }

    static async updateTodo(req, res) {
        try {
            const { id } = req.user;
            const { id: userId } = req.params;
            const { title, description, completed } = req.body;
            const dbResponse = await db.Todo.update({ title, description, completed },
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
                        completed
                    }
                });
            }else{
                res.status(400).json({
                    message: 'Todo was not updated'
                });
            }
        } catch(error) {
            res.status(500).json({
                message: 'Todo could not be updated'
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
                    message: 'Todo was deleted successfully'
                });
            }else{
                res.status(400).json({
                    message: 'Unable to delete Todo item'
                });
            }
            
        } catch(error) {
            res.status(500).json({
                message: 'Todo could not be deleted'
            });
        }
    }


}


export default TodoController;