import React from "react";
import { TodoListener } from "../model/shared-types";
import { Todo, TodoStatus } from "../model/todo.model"
import { Button, StyleSheet, Text, View, } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
                {todo.id} {todo.text} - {new Date(todo.deadline).toDateString()}
            </Text>

            <View style={styles.todoItemRight}>
                <Text style={styles.todoItemStatus}>{TodoStatus[todo.status].substring(0, 1)}</Text>
                {todo.status === TodoStatus.Active ?
                    <FontAwesome.Button style={styles.button} name="check-circle" size={40} color="green" backgroundColor='transparent'
                        onPress={handleCompletion} /> :
                    // <Button color="green" onPress={handleCompletion} title='Complete'/> :
                    <FontAwesome.Button style={styles.button} name="times-circle" size={40} color="red" backgroundColor='transparent'
                        onPress={() => onDelete(todo)} />
                }
                <FontAwesome.Button style={styles.button} name="pencil-square" size={40} color="gray" backgroundColor='transparent'
                    onPress={() => onEdit(todo)} />
            </View>
        </View >
    )
}

export default TodoItem

const styles = StyleSheet.create({
    todoItem: {
        marginTop: 10,
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
        width: '65%',
        fontSize: 24,
    },
    todoItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    todoItemRight: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        padding: 0,
        backgroundImage: 'gray',
        border: 1
    },
    todoItemStatus: {
        fontSize: 24,
    },
    button: {
        padding: 0,
        width: 50,
        height: 40,
    }
});