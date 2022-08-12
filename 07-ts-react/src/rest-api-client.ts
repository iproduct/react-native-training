import { Identifiable, IdType } from "./shared-types.js";
import { Todo } from "./todo.model.js";

const API_BASE_URL = "http://localhost:4000/api/todos";

export interface ApiClient<K, V extends Identifiable<K>>{
    getAllPosts(): Promise<V[]>;
    getPostById(id: K): Promise<V>;
    addNewPost(entityWithoutId: Partial<V>): Promise<V>;
    updatePost(entity: V): Promise<V>;
    deletePostById(id: K): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K,V> {

    async getAllPosts(): Promise<V[]> {
        return this.handleRequest(API_BASE_URL);
    }

    async getPostById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${id}`);
    }

    async addNewPost(post: Partial<V>): Promise<V> {
        return this.handleRequest(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async updatePost(post: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${post.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async deletePostById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export const TodosAPI = new ApiClientImpl<IdType, Todo>();

