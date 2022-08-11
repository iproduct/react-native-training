import { Todo, TodoStatus } from "./todo.model"
import { TodoListener } from "./TodoApp";
import './TodoItem.css'

interface TodoItemProps {
    todo: Todo;
    onChangeStatus: TodoListener;
    onUpdate: TodoListener;
    onDelete: TodoListener;
}

const TodoItem = ({ todo, onChangeStatus, onUpdate, onDelete }: TodoItemProps) => {
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className="TodoItem-id">{todo.id}</span> 
                {todo.text}
            </span>
            <span className="TodoItem-right">
                <span className="TodoItem-status">{TodoStatus[todo.status]}</span>

            </span>
        </div>
    )
}

export default TodoItem