import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { BlogsAPI } from "./dao/rest-api-client";
import { FilterType, Optional } from "./model/shared-types";
import { Form } from "./components/formbuilder/Form";
import { Post, PostStatus } from "./model/posts.model";
import PostList from "./components/PostList";
import { FormComponentConfigs } from "./components/formbuilder/form-types";
import IconButton from './components/IconButton';
import * as yup from 'yup';

export enum Views {
  PostFormView = 1, PostListView
}

interface AppState {
  activeView: Views;
  errors: string | undefined;
  posts: Post[];
  filter: FilterType;
  editedPost: Post;
}

const EMPTY_POST = new Post('', '', [], '', 1);

class App extends Component<{}, AppState> {
  state: AppState = {
    activeView: Views.PostListView,
    errors: '',
    posts: [],
    filter: undefined,
    editedPost: EMPTY_POST,
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

  handleSubmitPost = async (post: Post) => {
    try {
      post.tags = post.tags.filter(tag => tag.trim().length > 0)
      if (post.id) { //edit post
        const updated = await BlogsAPI.update(post);
        this.setState(({ posts }) => ({
          posts: posts.map(p => p.id === updated.id ? updated : p),
        }))
      } else { // create post
        const created = await BlogsAPI.create(post);
        this.setState(({ posts }) => ({
          posts: posts.concat(created),
        }));
      }
      this.setState({
        errors: undefined,
        editedPost: EMPTY_POST,
        activeView: Views.PostListView,
      });
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleFormCancel = () => {
    this.setState({
      errors: undefined,
      activeView: Views.PostListView,
    })
  }

  handleEditTodo = (post: Post) => {
    this.setState({ editedPost: post, activeView: Views.PostFormView });
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
                    initialValue={this.state.editedPost}
                    onSubmit={this.handleSubmitPost}
                    onCancel={this.handleFormCancel} />
                </ScrollView>);
            case Views.PostListView:
              return (
                <PostList posts={this.state.posts}
                  filter={this.state.filter}
                  onDelete={this.handleDeleteTodo}
                  onEdit={this.handleEditTodo}
                />);
          }
        })()}
      </SafeAreaView>
    );
  }
}

export default App;


type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  title: 'FormTextComponent';
  content: 'FormTextComponent';
  tags: 'FormTextComponent';
  imageUrl: 'FormTextComponent';
  status: 'FormDropdownComponent';
  authorId: 'FormTextComponent';
}

const postFormConfig: FormComponentConfigs<Post, PostFormPropToCompKindMapping> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
    label: 'ID',
  },
  title: {
    label: 'Blog Title',
    validators: yup.string().min(3).max(40),
  },
  content: {
    label: 'Blog Content',
    options: {
      multiline: true,
    },
    validators: yup.string().min(40).max(2048),
  },
  tags: {
    convertor: {
      fromString: (tags: string) => tags.split(/\W+/),
      toString: (tagsArray: string[]) => tagsArray.toString()
    }
  },
  imageUrl: {
    label: 'Blog Image URL',
    validators: yup.string().url(),
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
    validators: yup.number().integer().positive(),
    convertor: {
      fromString: (value: string) => {
        const num = +value;
        return isNaN(num) ? 0 : num;
      },
      toString: (num: number) => num + ''
    }
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