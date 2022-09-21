import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { Todo } from '../model/todo.model';
import { AppDispatch, RootState } from '../redux/store';
import { deleteTodo, editedTodo, editTodo, filteredTodos, submitTodo, todosFilter } from '../redux/todos-slice';

function mapStateToProps(state: RootState) {
    return {
        todos: filteredTodos(state),
        editedTodo: editedTodo(state),
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
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
        console.log(this.props.todos);
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