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
    postElem.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <img class="post-img" src=${post.imageUrl}>
        <div class="post-content">
            <div class="post-metadata">Author: ${post.authorId}, Tags: ${post.tags.join(', ')}</div>
            <div class="post-text">${post.content}</div>
        </div>
    `;
    postsSection.insertAdjacentElement("beforeend", postElem);
}

init()
