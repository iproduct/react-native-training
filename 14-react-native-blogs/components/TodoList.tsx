import { useMemo } from "react";
import { FlatList } from "react-native";
import { TodoListener } from "../model/shared-types";
import { Todo, TodoStatus } from "../model/todo.model";
import { FilterType } from "../TodoApp";
import TodoItem from "./TodoItem";

interface Props {
    todos: Todo[];
    filter: FilterType;
    onUpdate: TodoListener;
    onDelete: TodoListener;
    onEdit: TodoListener;
}

export default function TodoList({ todos, filter, ...rest }: Props) {
    const visibleTodos = (todos: Todo[], filter: FilterType) => todos.filter(todo => !filter ? true : todo.status === filter);
    const memoizedVisibleTodos = useMemo(() => visibleTodos(todos, filter), [todos, filter]);
    return (
        <FlatList<Todo> style={{width: '100%'}} data={memoizedVisibleTodos}
            renderItem={({ item: todo }) => <TodoItem todo={todo} key={todo.id} {...rest} />}
        />);
}