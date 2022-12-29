import { RequestHandler } from "express";
import { Todo } from '../models/todos.models';
import { pool } from "../queries";
import format  from 'pg-format';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  console.log(req.body);
  const t = (req.body as {text: Array<string>}).text;
  console.log(t);

  const arr = [];

  for(let i = 0;i < t.length; i++) {
    t[i] = t[i].replace('\n', '');
    arr.push([t[i]]);
  }
  console.log('finished array', arr);

  //let todos = [['test@example.com'], ['test2@example.com']];

  pool.query(format('INSERT INTO todos (text) VALUES %L', arr),[], (error, results) => {
    if (error) {
      throw error
    }
  })


  // for(let i = 0; i < t.length; i++) {
  //   pool.query(`INSERT INTO todos(text) VALUES($1) RETURNING *`, [t[i]], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //   })
  // }
  // res.status(201).json(`todos added: ${t}`)
}

export const getTodos: RequestHandler = (req, res, next) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({message: 'Updated!', updatedTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.json({message: "Todo deleted!"});
}

