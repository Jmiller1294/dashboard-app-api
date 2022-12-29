"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
//router function
const todosRouter = (0, express_1.Router)();
// todos routes
todosRouter.get('/', todos_controller_1.getTodos);
todosRouter.post('/', todos_controller_1.createTodo);
todosRouter.patch('/:id', todos_controller_1.updateTodo);
todosRouter.delete('/:id', todos_controller_1.deleteTodo);
exports.default = todosRouter;
