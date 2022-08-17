import React from "react";
import { TodoListener } from "../model/shared-types";
import { Todo, TodoStatus } from "../model/todo.model"
import { Button, StyleSheet, Text, View } from "react-native";

interface TodoItemProps {
    todo: Todo;
    onUpdate: TodoListener;
    onDelete: TodoListener;
    onEdit: TodoListener;
}

const TodoItem = ({ todo, onUpdate, onDelete, onEdit }: TodoItemProps) => {
    function handleCompletion() {
        onUpdate({ ...todo, status: TodoStatus.Completed })
    }
    return (
        <View style={styles.todoItem}>
            <Text style={styles.todoText}>
                <Text style={styles.todoItemId}>{todo.id}</Text>
                {todo.text} - {new Date(todo.deadline).toDateString()}
            </Text>
            <View style={styles.todoItemRight}>
                <Text style={styles.todoItemStatus}>{TodoStatus[todo.status]}</Text>
                {todo.status === TodoStatus.Active ?
                    <Button color="green" onPress={handleCompletion} title='Complete'/> :
                    <Button color="red" onPress={() => onDelete(todo)} title='Delete'/>
                }
                <span className="TodoItem-button fas fa-pen-to-square"
                    onClick={() => onEdit(todo)}></span>
            </View>
        </View >
    )
}

export default TodoItem

const styles = StyleSheet.create({
    todoItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 15,
        padding: 5,
        backgroundImage: 'gray',
        border: 1,
    },
    todoText: {
        width: '60%',
        fontSize: 24,
    },
    todoItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    todoItemRight: {
        width: '25%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        padding: 5,
        backgroundImage: 'gray',
        border: 1
    },
    todoItemStatus: {
        fontSize: 24,
    }
});