import { Identifiable, IdType } from "../model/shared-types.js";
import { User } from "../model/user.js";

const API_BASE_URL = "http://localhost:9000/api";

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

    async findByPage(page: number, limit: number): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.collectionSuffix}?${new URLSearchParams({
            _page: page + 1 + '',
            _limit: limit + '',
        }).toString()}`);
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

export const UsersAPI = new ApiClientImpl<IdType, User>('users');

