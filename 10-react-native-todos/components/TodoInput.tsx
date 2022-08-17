import React, { Component, ReactNode, Fragment, ReactElement, JSXElementConstructor } from 'react';
import { Optional } from './shared-types';
import { Todo, TodoStatus } from './todo.model';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    todo: Optional<Todo>;
    onCreateTodo: TodoListener;
    children?: ReactNode;
}

interface TodoInputState {
    id: string;
    text: string;
    deadline: string;
}

interface FieldToLabelMap {
    [field: string]: ReactNode;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        id: this.props.todo?.id?.toString() || '',
        text: this.props.todo?.text || '',
        deadline: this.props.todo?.deadline || new Date().toISOString()
    }
    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(
            new Todo(this.state.text, new Date(this.state.deadline).toISOString(), TodoStatus.Active,
                this.state.id ? parseInt(this.state.id) : undefined));
        this.setState({ text: '' })
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof TodoInputState & string;
        const stateUpdate = { [fieldName]: event.target.value } as unknown as TodoInputState;
        this.setState(stateUpdate);
    }

    handletodoReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({ text: '' })
    }

    render() {
        const labels = React.Children.toArray(this.props.children);
        const labelsMap: FieldToLabelMap = {}
        labels.filter(node =>
            typeof node !== 'string' && typeof node !== 'number' ?
                (node as ReactElement<any, string | JSXElementConstructor<any>>).type === 'label' :
                false)
            .forEach(labelNode => {
                const anyNode = labelNode as any;
                const field = (anyNode.props && anyNode.props.htmlFor) as string | undefined;
                if(field) {
                    labelsMap[field] = labelNode;
                }
            })
        return (
                <form className="TodoInput-form" onSubmit={this.handleTodoSubmit}>
                    {labelsMap['id']}
                    <input type="text" id="id" name="id" defaultValue={this.state.id} disabled />
                    {labelsMap['text']}
                    <input type="text" id="text" name="text" value={this.state.text}
                        onChange={this.handleTextChanged} />
                    {labelsMap['deadline']}
                    <input type="date" id="deadline" name="deadline" value={this.state.deadline}
                        onChange={this.handleTextChanged} />
                    <button className='button button5' type="submit">Add TODO</button>
                    <button className='button button3' type="reset" onClick={this.handletodoReset}>Reset</button>
                </form>
        );
    }
}

export default TodoInput;