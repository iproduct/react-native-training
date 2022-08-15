import { Identifiable, IdType } from "./shared-types.js";
import { Todo } from "./todo.model.js";

const API_BASE_URL = "http://localhost:4000/api/todos";

export interface ApiClient<K, V extends Identifiable<K>>{
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K,V> {

    async findAll(): Promise<V[]> {
        return this.handleRequest(API_BASE_URL);
    }

    async findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${id}`);
    }

    async create(post: Partial<V>): Promise<V> {
        return this.handleRequest(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async update(post: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${post.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async deleteById(id: K): Promise<V> {
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

