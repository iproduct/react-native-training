import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
import { IdType } from './shared-types.js';

const postsSection = document.getElementById("posts")!;
const erorrsDiv = document.getElementById("errors")!;
const addPostForm = document.getElementById("add-post-form")! as HTMLFormElement;
const resetButton = document.getElementById("form-reset-button")! as HTMLButtonElement;
addPostForm.addEventListener('submit', handleSubmitPost);
resetButton.addEventListener('click', resetForm);

interface AppState {
  editedPost: Post | undefined;
  allPosts: Post[]
}

const APP_STATE: AppState = {
  editedPost: undefined,
  allPosts: []
}

async function init() {
  try {
    const allPosts = await BlogsAPI.getAllPosts();
    APP_STATE.allPosts = allPosts;
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts: Post[]) {
  posts.forEach(post => addPostDOM(post));
}

export function showError(err: any) {
  erorrsDiv.innerHTML = `<div>${err}</div>`;
}

export function addPostDOM(post: Post) {
  const postElem = document.createElement('article');
  postElem.setAttribute('id', post.id.toString());
  postElem.className = "col s12 m6 l4";
  updateArticleInnerHtml(postElem, post);
  postsSection.insertAdjacentElement("beforeend", postElem);
}

export function updatePostDOM(post: Post) {
  const postElem = document.getElementById(post.id.toString())!;
  updateArticleInnerHtml(postElem, post);
}

function updateArticleInnerHtml(postElem: HTMLElement, post: Post) {
  postElem.innerHTML = `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${post.imageUrl}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
      <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
      <p>${post.content}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit${post.id}">Edit
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${post.id}">Delete
        <i class="material-icons right">clear</i>
      </button>
    </div>
    </div>
    `;
  postElem.querySelector(`#delete${post.id}`)!.addEventListener('click', event => deletePost(post.id))
  postElem.querySelector(`#edit${post.id}`)!.addEventListener('click', event => editPost(post))
}

function editPost(post: Post) {
  fillPostForm(post);
  window.scrollTo(0, 0);
  APP_STATE.editedPost = post;
}

function fillPostForm(post: Post) {
  let field: keyof Post;
  for (field in post) {
    (document.getElementById(field) as HTMLFormElement).value = post[field];
    const label = document.querySelector(`#add-post-form label[for=${field}]`);
    if (label) {
      label.className = 'active';
    }
  }
}


async function handleSubmitPost(event: SubmitEvent) {
  try {
    event.preventDefault();
    const formData = new FormData(addPostForm);
    type PostDict = {
      [key: string]: string
    };
    const np: PostDict = {};
    formData.forEach((value, key) => {
      np[key] = value.toString();
    })
    // const post = newPost as unknown as Post;
    if (np.id) {
      const post = new Post(parseInt(np.id), np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
      const updated = await BlogsAPI.updatePost(post);
      updatePostDOM(updated);
      APP_STATE.editedPost = undefined;
    } else {
      const newPost = new PostCreateDto(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
      const created = await BlogsAPI.addNewPost(newPost);
      addPostDOM(created);
    }
    resetForm();
  } catch (err) {
    showError(err);
  }
}

export function resetForm() {
  if (APP_STATE.editedPost) {
    fillPostForm(APP_STATE.editedPost);
  } else {
    addPostForm.reset();
  }
}

export async function deletePost(postId: IdType) {
  try {
    await BlogsAPI.deletePostById(postId);
    document.getElementById(postId.toString())?.remove();
  } catch (err) {
    showError(err);
  }
}


init()
