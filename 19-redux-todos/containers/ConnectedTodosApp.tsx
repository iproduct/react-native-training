import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import IconButton from '../components/IconButton';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { Todo } from '../model/todo.model';
import { deleteTodo, editTodo, submitTodo, TodosAction } from '../redux/actions';
import { StoreState } from "../redux/reducers";

function mapStateToProps({ todos: {todos, editedTodo} }: StoreState) {
    return {
        todos,
        editedTodo
    }
}

function mapDispatchToProps(dispatch: Dispatch<TodosAction>) {
    return {
        onDeleteTodo: (id: number) => dispatch(deleteTodo(id)),
        onSubmitTodo: (todo: Todo) => dispatch(submitTodo(todo)),
        onEditTodo: (todo: Todo) => dispatch(editTodo(todo)),
    }
}

interface TodosAppProps {
    todos: Todo[];
    editedTodo: Todo | undefined,
    onDeleteTodo: (id: number) => void;
    onSubmitTodo: (todo: Todo) => void;
    onEditTodo: (todo: Todo) => void,
}

class TodosApp extends PureComponent<TodosAppProps> {
    render() {
        return (
            <View>
                <Text style={styles.text}>TODOs Manager</Text>
                <TodoInput key={this.props.editedTodo?.id} todo={this.props.editedTodo} onCreateTodo={this.props.onSubmitTodo} />
                <TodoList
                    todos={this.props.todos}
                    filter={undefined}
                    onUpdate={this.props.onSubmitTodo}
                    onDelete={todo => this.props.onDeleteTodo(todo.id)}
                    onEdit={this.props.onEditTodo}
                />
                {/* <View style={styles.buttons}>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onCreateTodo} name='level-up' >
                        +1
                    </IconButton>
                    <IconButton size={20} backgroundColor="#ff4466" color="white"
                        onPress={this.props.onDeleteTodo} name='level-down' >
                        -1
                    </IconButton> */}
                {/* </View> */}
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosApp);

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    },
})