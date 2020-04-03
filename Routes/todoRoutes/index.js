import { Router } from 'express';
import TodoController from '../../controllers/TodoController';
import verifyToken from '../../middleware/verifyToken';


const todoRoutes = Router();

todoRoutes.post('/todos', verifyToken, TodoController.createTodo);
todoRoutes.get('/todos', verifyToken, TodoController.getUserTodos);
todoRoutes.get('/todos/:id', TodoController.getTodo);
todoRoutes.put('/todos/:id', TodoController.updateTodo);
todoRoutes.delete('/todos/:id', TodoController.deleteTodo);

export default todoRoutes;