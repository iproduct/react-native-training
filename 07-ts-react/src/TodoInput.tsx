import React, { Component } from 'react';
import { Todo } from './todo.model';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: ''
    }
    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(this.state.text));
        this.setState({text: ''})
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({text: event.target.value})
    }

    handletodoReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({text: ''})
    }

    render() {
        return (
            <form className="TodoInput-form" onSubmit={this.handleTodoSubmit}>
                <label htmlFor="TodoInput-todo-text">What to do next?</label>
                <input type="text" id="TodoInput-todo-text" name="TodoInput-todo-text" value={this.state.text}
                    onChange={this.handleTextChanged} />
                <button className='button button5' type="submit">Add TODO</button>
                <button className='button button3' type="reset" onClick={this.handletodoReset}>Reset</button>
            </form>
        );
    }
}

export default TodoInput;