import { Post } from "../model/posts.model.js";
import { Identifiable, IdType } from "../model/shared-types.js";
import { Todo } from "../model/todo.model.js";

const API_BASE_URL = "http://192.168.1.101:4000/api";

export interface ApiClient<K, V extends Identifiable<K>>{
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K,V> {
    constructor(public collectionSuffix: string) {}

    async findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}`);
    }

    async findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}/${id}`);
    }

    async create(post: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async update(post: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}/${post.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async deleteById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}/${id}`, {
            method: 'DELETE'
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body?.toString());
            }
            return postsResp.json();
        } catch (err) {
            return Promise.reject(err?.toString());
        }
    }
}

export const TodosAPI = new ApiClientImpl<IdType, Todo>('todos');
export const BlogsAPI = new ApiClientImpl<IdType, Post>('posts');

