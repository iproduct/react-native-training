import { getAllPosts } from "./blogs-api-client";

const postsSection = document.getElementById("posts");

function init() {
    const allPosts = getAllPosts();
    showPosts(allPosts);
}

export function showPosts(posts) {
    posts.forEach(post => addPost(post));
}

export function addPost(post) {
    const postElem = document.createElement('article');
    postElem.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <img class="post-img" src=${post.imageUrl}>
        <div class="post-content">
            <div class="post-metadata">Author: ${post.authorId}, Tags: ${post.tags.join(', ')}</div>
            <div class="post-text">${post.content}</div>
        </div>
    `;
    postsSection.insertAdjacentElement("beforeend", postsElem);
}

init()
