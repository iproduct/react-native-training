import React, { Component } from "react";
import { FlatList, Image, Text, TextInput, View, StyleSheet, SectionList } from "react-native";
import { Cat } from "./cat-model";
import CatComponent, { CatComponentProps } from "./CatComponent";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TodosAPI } from "./dao/rest-api-client";
import { Optional } from "./model/shared-types";
import { Todo } from "./model/todo.model";
import { FEMALE_CATS, MALE_CATS } from "./sample-cats";
import { FilterType } from "./TodoApp";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface AppState {
  errors: string | undefined;
  todos: Todo[];
  filter: FilterType;
  editedTodo: Optional<Todo>;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    errors: '',
    todos: [],
    filter: undefined,
    editedTodo: undefined,
  }

  async componentDidMount() {
    try {
      const allTodos = await TodosAPI.findAll();
      this.setState({ todos: allTodos, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleUpdateTodo = (todo: Todo) => {
    this.setState(({ todos }) => ({
      todos: todos.map(td => td.id === todo.id ? todo : td)
    }))
  }

  handleDeleteTodo = async (todo: Todo) => {
    try {
      await TodosAPI.deleteById(todo.id);
      this.setState(({ todos }) => ({
        todos: todos.filter(td => td.id !== todo.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleCreateTodo = async (todo: Todo) => {
    try {
      if (todo.id) { //edit todo
        const updated = await TodosAPI.update(todo);
        this.setState(({ todos }) => ({
          todos: todos.map(td => td.id === updated.id ? updated : td),
          errors: undefined,
          editedTodo: undefined
        }))
      } else { // create todo
        const created = await TodosAPI.create(todo);
        this.setState(({ todos }) => ({
          todos: todos.concat(created),
          errors: undefined
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleEditTodo = (todo: Todo) => {
    this.setState({ editedTodo: todo });
  }

  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  render() {
    return (
      <PaperProvider theme={{...DefaultTheme, fonts:{
        medium: {
          padding: 0
        }
      }}}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.header}>TODO Demo</Text>
          {this.state.errors && <Text style={styles.errors}>{this.state.errors}</Text>}
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo} onCreateTodo={this.handleCreateTodo} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdate={this.handleUpdateTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          />
        </View>
      </PaperProvider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  errors: {
    padding: 5,
    fontSize: 20,
    border: 1,
    borderRadius: 5,
    backgroundColor: '#eecccc',
    color: 'red',
    textAlign: 'center',
  }
});