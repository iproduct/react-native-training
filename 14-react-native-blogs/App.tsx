import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { BlogsAPI } from "./dao/rest-api-client";
import { FilterType, Optional } from "./model/shared-types";
import { Form } from "./components/formbuilder/Form";
import { Post, PostStatus } from "./model/posts.model";
import PostList from "./components/PostList";
import { FormComponentConfigs } from "./components/formbuilder/form-types";
import IconButton from './components/IconButton';
import { FormTextComponent } from "./components/formbuilder/FormTextComponent";

export enum Views {
  PostFormView = 1, PostListView
}

interface AppState {
  activeView: Views;
  errors: string | undefined;
  posts: Post[];
  filter: FilterType;
  editedPost: Optional<Post>;

}

type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  title: 'FormTextComponent';
  content: 'FormTextComponent';
  tags: 'FormTextComponent';
  imageUrl: 'FormTextComponent';
  status: 'FormDropdownComponent';
  authorId: 'FormTextComponent';
}


class App extends Component<{}, AppState> {
  state: AppState = {
    activeView: Views.PostListView,
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

  handleCreatePost = async (post: Post) => {
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

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.PostListView ? Views.PostFormView : Views.PostListView
    }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="green" />
        <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
          {this.state.activeView === Views.PostListView ? 'Add New Post' : 'Show All Posts'}
        </IconButton>
        {(() => {
          switch (this.state.activeView) {
            case Views.PostFormView:
              return (
                <ScrollView contentContainerStyle={styles.form}>
                  <Form<Post, PostFormPropToCompKindMapping>
                    config={postFormConfig}
                    // initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
                    initialValue={new Post('', '', [], '', 1)}
                    onSubmit={this.handleCreatePost} />
                </ScrollView>);
            case Views.PostListView:
              return (
                <PostList posts={this.state.posts}
                  filter={this.state.filter}
                  onUpdate={this.handleUpdateTodo}
                  onDelete={this.handleDeleteTodo}
                  onEdit={this.handleEditTodo}
                />);
          }
        })()}
      </SafeAreaView>
    );

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

const postFormConfig: FormComponentConfigs<Post, PostFormPropToCompKindMapping> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
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
    options: {
    }
  },
  status: {
    componentKind: 'FormDropdownComponent',
    label: 'Blog Status',
    options: {
      choices: [
        { label: PostStatus[PostStatus.Published], value: PostStatus.Published },
        { label: PostStatus[PostStatus.Draft], value: PostStatus.Draft }
      ]
    }
  },
  authorId: {
    label: 'Author ID',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
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