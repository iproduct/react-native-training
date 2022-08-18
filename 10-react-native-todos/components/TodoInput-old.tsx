import React, { Component, ReactNode, Fragment, ReactElement, JSXElementConstructor } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Platform } from 'react-native';
import { Optional, TodoListener } from '../model/shared-types';
import { Todo, TodoStatus } from '../model/todo.model';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TodoInputProps {
    todo: Optional<Todo>;
    onCreateTodo: TodoListener;
    children?: ReactNode;
}

interface TodoInputState {
    id: string;
    text: string;
    deadline: string;
    showDatepicker: boolean;
}

interface FieldToLabelMap {
    [field: string]: ReactNode;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        id: this.props.todo?.id?.toString() || '',
        text: this.props.todo?.text || '',
        deadline: this.props.todo?.deadline || new Date().toISOString(),
        showDatepicker: false
    }
    handleTodoSubmit = () => {
        this.props.onCreateTodo(
            new Todo(this.state.text, new Date(this.state.deadline).toISOString().split('T')[0], TodoStatus.Active,
                this.state.id ? parseInt(this.state.id) : undefined));
        this.setState({ text: '' })
    }

    handleFieldChanged(field: string, text: string) {
        const stateUpdate = { [field]: text } as unknown as TodoInputState;
        this.setState(stateUpdate);
    }

    handletodoReset = () => {
        this.setState({ text: '', deadline: '' })
    }

    render() {
        return (
            <View style={styles.form}>
                <Text style={styles.label}>ID</Text>
                <TextInput style={styles.input} defaultValue={this.state.id} />
                <Text style={styles.label}>What to do next?</Text>
                <TextInput style={styles.input} value={this.state.id}
                    onChangeText={this.handleFieldChanged.bind(this, 'text')}
                />
                <Text style={styles.label}>What's the deadline?</Text>
                <TextInput style={styles.input} value={this.state.deadline}
                    onChangeText={this.handleFieldChanged.bind(this, 'deadline')}
                />
                {Platform.OS === 'web' ?
                    <Text style={styles.label}>`DatePicker isn't available on your platform`</Text> :
                    <>
                        <Button
                            onPress={() => this.setState({ showDatepicker: true })}
                            title="Show picker!"
                        />
                        {
                            this.state.showDatepicker && <DateTimePicker
                                value={new Date(this.state.deadline)}
                                mode='date'
                                is24Hour={true}
                                onChange={(event, date) => {
                                    this.handleFieldChanged('deadline', date ? date.toISOString().split('T')[0] : '');
                                    this.setState({ showDatepicker: false });
                                }}
                            />
                        }
                    </>
                }
                <Button color="green" onPress={this.handleTodoSubmit} title='Add TODO' />
                <Button color="green" onPress={this.handletodoReset} title='Reset' />
            </View>
        );
    }
}

export default TodoInput;

const styles = StyleSheet.create({
    form: {
        padding: 10,
    },
    label: {
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 24,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    }
});