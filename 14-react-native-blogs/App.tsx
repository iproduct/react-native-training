import React, { Component } from "react";
import { FlatList, Image, Text, TextInput, View, StyleSheet, SectionList } from "react-native";
import { Cat } from "./cat-model";
import CatComponent, { CatComponentProps } from "./CatComponent";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { BlogsAPI, TodosAPI } from "./dao/rest-api-client";
import { Optional } from "./model/shared-types";
import { Todo } from "./model/todo.model";
import { FEMALE_CATS, MALE_CATS } from "./sample-cats";
import { FilterType } from "./TodoApp";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Form } from "./components/formbuilder/Form";
import { Post } from "./model/posts.model";

interface AppState {
  errors: string | undefined;
  posts: Post[];
  filter: FilterType;
  editedPost: Optional<Post>;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    errors: '',
    posts: [],
    filter: undefined,
    editedPost: undefined,
  }

  async componentDidMount() {
    try {
      const allPosts = await BlogsAPI.findAll();
      this.setState({ posts: allPosts, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleUpdateTodo = (post: Post) => {
    this.setState(({ posts }) => ({
      posts: posts.map(td => td.id === post.id ? post : td)
    }))
  }

  handleDeleteTodo = async (post: Post) => {
    try {
      await BlogsAPI.deleteById(post.id);
      this.setState(({ posts }) => ({
        posts: posts.filter(p => p.id !== post.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleCreateTodo = async (post: Post) => {
    try {
      if (post.id) { //edit post
        const updated = await BlogsAPI.update(post);
        this.setState(({ posts }) => ({
          posts: posts.map(p => p.id === updated.id ? updated : p),
          errors: undefined,
          editedPost: undefined
        }))
      } else { // create post
        const created = await BlogsAPI.create(post);
        this.setState(({ posts }) => ({
          posts: posts.concat(created),
          errors: undefined
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleEditTodo = (post: Post) => {
    this.setState({ editedPost: post });
  }

  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  render() {
    return (
      <Form<Post> style={styles.form}
        config={{
          id: {
            label: 'ID',
          },
        title: {
            label: 'Blog Title',
          },
          content: {
            label: 'Blog Content',
          },
          tags: {
          },
          imageUrl: {
            label: 'Blog Image URL',
          },
          status: {
            componentKind: 'FormDropdownComponent',
            label: 'Blog Status',
          },
          authorId: {
            label: 'Author ID',
          },
        }}
        initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
        onSubmit={(todo: Post) => { }} />);

    {/* <Text style={styles.header}>TODO Demo</Text>
          {this.state.errors ? <Text style={styles.errors}>{this.state.errors}</Text>:<></>}
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo} onCreateTodo={this.handleCreateTodo} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdate={this.handleUpdateTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          /> */}
  }
}

export default App;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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