import db from '../models';

class TodoController {
    static async createTodo(req, res){
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
        } catch (error) {
           res.status(500).json({
               message: 'Unable to create Todo'
           })
        }
        
    }

    static async getUserTodos(req, res){
        try {
            const { id } = req.user;
            console.log(id);
            const dbResponse = await db.Todo.findAll({
                where: {
                    userId: id
                }
            });
            console.log(dbResponse);
        } catch (error) {
            res.status(500).json({
                message: 'Unable to get Todos for user'
            })
           
        }
    }

    static async getTodo(req, res){
        
    }

    static async updateTodo(req, res){
        
    }

    static async deleteTodo(req, res){
        
    }


}


export default TodoController;