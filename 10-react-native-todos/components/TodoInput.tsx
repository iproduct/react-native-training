import {
    en,
    registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)
import React, { Component, ReactNode, Fragment, ReactElement, JSXElementConstructor } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Platform } from 'react-native';
import { Optional, TodoListener } from '../model/shared-types';
import { Todo, TodoStatus } from '../model/todo.model';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate, SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
        deadline: this.props.todo?.deadline || getIsoDate(new Date()),
        showDatepicker: false
    }
    handleTodoSubmit = () => {
        this.props.onCreateTodo(
            new Todo(this.state.text, getIsoDate(new Date(this.state.deadline)), TodoStatus.Active,
                this.state.id ? parseInt(this.state.id) : undefined));
        this.setState({ text: '', deadline: '' })
    }

    handleFieldChanged(field: string, text: string) {
        const stateUpdate = { [field]: text } as unknown as TodoInputState;
        this.setState(stateUpdate);
    }

    handletodoReset = () => {
        this.setState({ text: '', deadline: getIsoDate(new Date()), id: '' })
    }

    handleDateChange = ({ date }: { date: CalendarDate }) => {
        this.handleFieldChanged('deadline', date ? getIsoDate(date) : '');
        this.setState({ showDatepicker: false });
    }

    render() {
        return (
            <View style={styles.form}>
                <Text style={styles.label}>ID</Text>
                <Text style={styles.idField}>{this.state.id}</Text>
                <Text style={styles.label}>What to do next?</Text>
                <TextInput style={styles.input} value={this.state.text}
                    onChangeText={this.handleFieldChanged.bind(this, 'text')}
                />
                <Text style={styles.label}>What's the deadline?</Text>
                <View style={styles.dateChooser}>
                    <TextInput style={styles.dateInput} value={this.state.deadline}
                        onChangeText={this.handleFieldChanged.bind(this, 'deadline')}
                    />
                    <Button
                        color='gray'
                        onPress={() => this.setState({ showDatepicker: true })}
                        title="Choose Date"
                    />
                </View>



                {/* <DateTimePickerModal
                    isVisible={this.state.showDatepicker}
                    date={new Date(this.state.deadline)}
                    mode='date'
                    onConfirm={(date) => {
                        this.handleFieldChanged('deadline', date ? date.toISOString().split('T')[0] : '');
                        this.setState({ showDatepicker: false });
                    }}
                    onCancel={() => this.setState({ showDatepicker: false })}
                /> */}

                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={this.state.showDatepicker}
                    onDismiss={() => this.setState({ showDatepicker: false })}
                    date={new Date(this.state.deadline)}
                    onConfirm={this.handleDateChange}
                    onChange={this.handleDateChange}
                    saveLabel="Save"
                />
                <View style={styles.buttons}>
                    <FontAwesome.Button backgroundColor="green" size={45} onPress={this.handleTodoSubmit} name='check-circle'>
                        <Text style={styles.buttonText}>Add TODO</Text>
                    </FontAwesome.Button>
                    <FontAwesome.Button backgroundColor="red" size={45} onPress={this.handletodoReset} name='times-circle'>
                        <Text style={styles.buttonText}>Reset</Text>
                    </FontAwesome.Button>
                </View>
            </View>
        );
    }
}

export default TodoInput;

const styles = StyleSheet.create({
    form: {
        padding: 10,
        width: '100%',
    },
    label: {
        paddingTop: 15,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 24,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    idField: {
        fontSize: 24,
        width: '100%',
        height: 45,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    dateChooser: {
        display: 'flex',
        flexDirection: 'row',
    },
    dateInput: {
        flex: 1,
        fontSize: 20,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttons: {
        fontSize: 45,
        marginTop: 20,
        marginBottmo: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
    },
});

export function getIsoDate(date: Date) {
    return date.toISOString().split('T')[0];
}