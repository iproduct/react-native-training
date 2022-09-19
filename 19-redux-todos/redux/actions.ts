import { Todo, TodoStatus } from '../model/todo.model';
import { SUBMIT_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes';

export interface SubmitTodo {
    type: SUBMIT_TODO;
    payload: Todo;
}

export interface EditTodo {
    type: EDIT_TODO;
    payload: Todo;
}

export interface DeleteTodo {
    type: DELETE_TODO;
    id: number;
}

export type TodosAction = SubmitTodo | EditTodo | DeleteTodo

export function submitTodo(todo: Todo): SubmitTodo {
    return {
        type: SUBMIT_TODO,
        payload: todo,
    };
}

export function editTodo(todo: Todo): EditTodo {
    return {
        type: EDIT_TODO,
        payload: todo,
    };
}

export function deleteTodo(id: number): DeleteTodo {
    return {
        type: DELETE_TODO,
        id
    };
}
