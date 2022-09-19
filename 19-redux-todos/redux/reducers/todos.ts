import { DELETE_TODO, EDIT_TODO, SUBMIT_TODO } from './../actionTypes';
import { } from '../actionTypes';
import { TodosAction } from '../actions';
import { Todo } from '../../model/todo.model';

export type TodosState = {
    todos:Todo[],
    editedTodo: Todo | undefined,
}

const initialState: TodosState = {
    todos: [],
    editedTodo: undefined,
}
    
let NEXT_TODO_ID = 0;

export default function (state = initialState, action: TodosAction) {
    switch (action.type) {
        case SUBMIT_TODO: {
            const todo = action.payload;
            if(todo.id) {
                return {
                    ...state,
                    todos: state.todos.map(td => td.id === todo.id ? todo : td)
                }
            }
            else {
                return {
                    ...state,
                    todos: [...state.todos, {...todo, id: ++NEXT_TODO_ID}],
                }
            }
            
        }
        case EDIT_TODO: {
            return {
                ...state,
                editedTodo: action.payload
            }
        }
        case DELETE_TODO: {
            return  {
                ...state,
                todos: state.todos.filter(td => td.id !== action.id)
            }
        }
        default:
            return state;
    }
}