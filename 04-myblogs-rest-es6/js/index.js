import { getAllPosts } from "./blogs-api-client.js";

const postsSection = document.getElementById("posts");
const erorrsDiv = document.getElementById("errors");

async function init() {
    try {
        const allPosts = await getAllPosts();
        showPosts(allPosts);
    } catch (err) {
        showError(err);
    }
}

export function showPosts(posts) {
    posts.forEach(post => addPost(post));
}

export function showError(err){
    erorrsDiv.innerHTML = `<div>${err}</div>`;
}

export function addPost(post) {
    const postElem = document.createElement('article');
    postElem.className = "col s12 m4";
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
    </div>
    `;
    postsSection.insertAdjacentElement("beforeend", postElem);
}

init()
