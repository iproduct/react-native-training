import React, { Component } from 'react';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default TodoInput;