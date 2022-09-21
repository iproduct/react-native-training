import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../model/todo.model";

export interface TodosState {
    todos: Todo[];
    editedTodo: Todo | undefined;
    isLoading: boolean;
}

const initialState: TodosState = {
    todos: [],
    editedTodo: undefined,
    isLoading: false,
}

let NEXT_TODO_ID = 0;

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchStart(state) {
            state.isLoading = true;
        },
        fetchSuccess(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
            state.isLoading = false;
        },
        submitTodo(state, action: PayloadAction<Todo>) {
            const todo = action.payload;
            if (todo.id) {
                state.todos = state.todos.map(td => td.id === todo.id ? todo : td)
            }
            else {
                state.todos.push({ ...todo, id: ++NEXT_TODO_ID })
            }
        },
        editTodo(state, action: PayloadAction<Todo>) {
            state.editedTodo = action.payload
        },
        deleteTodo(state, action: PayloadAction<number>) {
               state.todos =  state.todos.filter(td => td.id !== action.payload)
        },
        identity: state => state
    },
})

export const { fetchStart, fetchSuccess, submitTodo, editTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer