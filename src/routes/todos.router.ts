import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todos.controller";

//router function
const todosRouter = Router();

// todos routes
todosRouter.get('/', getTodos);
todosRouter.post('/', createTodo);
todosRouter.patch('/:id', updateTodo);
todosRouter.delete('/:id', deleteTodo);

export default todosRouter;
