import { Todo, TodoStatus } from "./todo.model";
import { FilterType } from "./TodoApp";
import TodoItem from "./TodoItem";
import './TodoList.css'

interface Props{
    todos: Todo[];
    filter: FilterType
}

export default function TodoList({todos, filter, ...rest}: Props) {
    return (<div className="TodoList">
        {
        todos.filter(todo => !filter ? true: todo.status === filter).map(todo =>
            (<TodoItem todo={todo} key={todo.id} />))
        }
    </div>)
}