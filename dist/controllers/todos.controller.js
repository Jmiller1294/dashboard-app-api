"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_models_1 = require("../models/todos.models");
const queries_1 = require("../queries");
const pg_format_1 = __importDefault(require("pg-format"));
const TODOS = [];
const createTodo = (req, res, next) => {
    console.log(req.body);
    const t = req.body.text;
    console.log(t);
    const arr = [];
    for (let i = 0; i < t.length; i++) {
        t[i] = t[i].replace('\n', '');
        arr.push([t[i]]);
    }
    console.log('finished array', arr);
    //let todos = [['test@example.com'], ['test2@example.com']];
    queries_1.pool.query((0, pg_format_1.default)('INSERT INTO todos (text) VALUES %L', arr), [], (error, results) => {
        if (error) {
            throw error;
        }
    });
    // for(let i = 0; i < t.length; i++) {
    //   pool.query(`INSERT INTO todos(text) VALUES($1) RETURNING *`, [t[i]], (error, results) => {
    //     if (error) {
    //       throw error
    //     }
    //   })
    // }
    // res.status(201).json(`todos added: ${t}`)
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    queries_1.pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new todos_models_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted!" });
};
exports.deleteTodo = deleteTodo;
