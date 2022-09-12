import React, { Component } from "react";
import { StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, FlatList, Dimensions, ColorSchemeName } from "react-native";
import { BlogsAPI } from "../dao/rest-api-client";
import { FilterType, Optional } from "../model/shared-types";
import { Form } from "./formbuilder/Form";
import { Post, PostStatus } from "../model/posts.model";
import PostList from "./PostList";
import { FormComponentConfigs } from "./formbuilder/form-types";
import IconButton from './IconButton';
import * as yup from 'yup';
import PostItem, { ITEM_HEIGHT, PostItemProps } from "./PostItem";
import Navigation from "../navigation";

export const DEFAULT_PAGE_SIZE = 5;

export enum Views {
  PostFormView = 1, PostListView
}

interface BlogsMainProps {
  colorScheme: NonNullable<ColorSchemeName>;
}

interface BlogsMainState {
  activeView: Views;
  errors: string | undefined;
  posts: Post[];
  page: number;
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
}
export const EMPTY_IMAGE_DATA = { uri: '', width: 0, height: 0 };
const EMPTY_POST = new Post('', '', [], EMPTY_IMAGE_DATA, 1);

class App extends Component<BlogsMainProps, BlogsMainState> {
  state: BlogsMainState = {
    activeView: Views.PostListView,
    errors: '',
    posts: [],
    page: 0,
    filter: undefined,
    editedPost: EMPTY_POST,
    scrollIndex: 0,
  }
  postsListRef = React.createRef<FlatList<Post>>()

  async componentDidMount() {
    this.loadMorePosts();
  }

  loadMorePosts = async () => {
    try {
      const newPosts = await BlogsAPI.findByPage(this.state.page, DEFAULT_PAGE_SIZE);
      this.setState(({ posts, page, errors }) => ({
        posts: posts.concat(newPosts),
        page: page + 1,
        errors: undefined
      }))
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<BlogsMainState>, snapshot?: any): void {
    if (this.state.activeView === Views.PostListView) {
      if (Platform.OS === 'web') {
        // this.postsListRef.current?.scrollToOffset({offset: (this.state.scrollIndex-1) * ITEM_HEIGHT - 1});
      } else {
        this.postsListRef.current?.scrollToIndex({ index: this.state.scrollIndex });
      }
    }
  }

  handleUpdatePost = (post: Post) => {
    this.setState(({ posts }) => ({
      posts: posts.map(td => td.id === post.id ? post : td)
    }))
  }

  handleDeletePost = async (post: Post) => {
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
        const scrollIndex = this.state.posts.findIndex(p => p.id === updated.id)
        this.setState(({ posts }) => {
          const postsCopy = posts.slice();
          postsCopy[scrollIndex] = updated;
          return {
            posts: postsCopy,
            scrollIndex,
          }
        });
      } else { // create post
        const created = await BlogsAPI.create(post);
        const scrollIndex = this.state.posts.length;
        this.setState(({ posts }) => ({
          posts: posts.concat(created),
          scrollIndex,
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
      editedPost: EMPTY_POST,
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
      <Navigation colorScheme={this.props.colorScheme}
        posts={this.state.posts}
        page={this.state.page}
        filter={this.state.filter}
        editedPost={this.state.editedPost}
        scrollIndex={this.state.scrollIndex}
      />
    );
  }

  /* <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
          {this.state.activeView === Views.PostListView ? 'Add New Post' : 'Show All Posts'}
        </IconButton> *
         {(() => {
          switch (this.state.activeView) {
            case Views.PostFormView:
              return (
                <Form<Post, PostFormPropToCompKindMapping>
                  config={postFormConfig}
                  // initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
                  initialValue={this.state.editedPost}
                  onSubmit={this.handleSubmitPost}
                  onCancel={this.handleFormCancel} />);
            case Views.PostListView:
              return (
                <PostList ref={this.postsListRef} posts={this.state.posts}
                  page={this.state.page}
                  filter={this.state.filter}
                  onDelete={this.handleDeletePost}
                  onEdit={this.handleEditTodo}
                  scrollIndex={this.state.scrollIndex}
                  onLoadMorePosts={this.loadMorePosts}
                />);
          }
        })()} */
}

export default App;


type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  title: 'FormTextComponent';
  content: 'FormTextComponent';
  tags: 'FormTextComponent';
  image: 'FormImageComponent';
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
  image: {
    componentKind: 'FormImageComponent',
    label: 'Blog Image URL',
    validators: yup.object().shape({
      uri: yup.string().required().test(
        'is-url',
        '${path} is not a valid URL',
        (value: string | undefined) => !!value && (value.startsWith('data') || yup.string().url().isValidSync(value))
      ),
      localUri: yup.string(),
      format: yup.string().oneOf(['jpeg', 'png', 'webp']),
      width: yup.number().integer().min(0),
      height: yup.number().integer().min(0)
    }),
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