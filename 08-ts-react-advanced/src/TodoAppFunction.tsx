import React, { useEffect, useState } from 'react';
import './App.css';
import { Todo, TodoStatus } from './todo.model';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TodosAPI } from './rest-api-client';
import TodoInputFunction from './TodoInputFunction';
import { Optional } from './shared-types';


export type FilterType = TodoStatus | undefined;

export interface TodoListener {
  (todo: Todo): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

function TodoAppFunction() {
  const [todos, setTodos] = useState([] as Todo[])
  const [filter, setFilter] = useState(undefined as FilterType)
  const [errors, setErrors] = useState(undefined as Optional<string>)

  useEffect(() => {
    TodosAPI.findAll().then(allTodos => {
      setTodos(allTodos);
      setErrors(undefined);
    }).catch(err => {
      setErrors(err as string);
    });
  }, []);


  function handleUpdateTodo(todo: Todo) {
    setTodos(todos => todos.map(td => td.id === todo.id ? todo : td));
  }

  async function handleDeleteTodo(todo: Todo) {
    try {
      await TodosAPI.deleteById(todo.id);
      setTodos(todos => todos.filter(td => td.id !== todo.id));
      setErrors(undefined);
    } catch (err) {
      setErrors(err as string);
    }
  }

  async function handleCreateTodo(todo: Todo) {
    try {
      const created = await TodosAPI.create(todo);
      setTodos(todos => todos.concat(created));
      setErrors(undefined);
    } catch (err) {
      setErrors(err as string);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>TODO Demo</h2>
        {errors && <div className="errors">{errors}</div>}
        <TodoInputFunction onCreateTodo={handleCreateTodo} />
        <TodoFilter filter={filter} onFilterChange={filter => setFilter(filter)} />
        <TodoList
          todos={todos}
          filter={filter}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </header>
    </div>
  );
}

export default TodoAppFunction;
