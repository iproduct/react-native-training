import React, { Component } from 'react';
import { Todo } from './todo.model';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
    date: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: '',
        date: new Date().toISOString()
    }
    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(this.state.text, new Date(this.state.date).toISOString()));
        this.setState({text: ''})
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof TodoInputState & string;
        const stateUpdate = {[fieldName]: event.target.value} as unknown as TodoInputState;
        this.setState(stateUpdate);
    }

    handletodoReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({text: ''})
    }

    render() {
        return (
            <form className="TodoInput-form" onSubmit={this.handleTodoSubmit}>
                <label htmlFor="TodoInput-todo-text">What to do next?</label>
                <input type="text" id="TodoInput-todo-text" name="text" value={this.state.text}
                    onChange={this.handleTextChanged} />
                <input type="date" id="TodoInput-todo-text" name="date" value={this.state.date}
                    onChange={this.handleTextChanged} />
                <button className='button button5' type="submit">Add TODO</button>
                <button className='button button3' type="reset" onClick={this.handletodoReset}>Reset</button>
            </form>
        );
    }
}

export default TodoInput;