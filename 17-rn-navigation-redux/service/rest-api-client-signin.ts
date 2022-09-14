import { LoggedUserData } from './../model/sign-in';
import { Credentials } from "../components/LoginForm.js";
import { Identifiable, IdType } from "../model/shared-types.js";
import { User } from "../model/user.js";

const API_BASE_URL = "http://localhost:9000/api/auth";

export interface SignInApiClient {
    signIn(post: Credentials): Promise<LoggedUserData>;
}

export class SignInApiClientImpl implements SignInApiClient {

    async signIn(post: Credentials): Promise<LoggedUserData> {
        return this.handleRequest(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
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

export const SignInAPI = new SignInApiClientImpl();

