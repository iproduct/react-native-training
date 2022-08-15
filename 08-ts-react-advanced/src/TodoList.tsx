import { useMemo } from "react";
import { Todo, TodoStatus } from "./todo.model";
import { FilterType, TodoListener } from "./TodoApp";
import TodoItem from "./TodoItem";
import './TodoList.css'

interface Props {
    todos: Todo[];
    filter: FilterType;
    onUpdate: TodoListener;
    onDelete: TodoListener;
}

export default function TodoList({ todos, filter, ...rest }: Props) {
    const visibleTodos = (todos: Todo[], filter: FilterType) => todos.filter(todo => !filter ? true : todo.status === filter);
    const memizedVisibleTodos = useMemo(() => visibleTodos(todos, filter), [todos, filter]);
    return (<div className="TodoList">
        {
            memizedVisibleTodos.map(todo =>
                <TodoItem todo={todo} key={todo.id} {...rest} />)
        }
    </div>)
}