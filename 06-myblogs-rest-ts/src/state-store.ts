import { Post } from "./posts.js";
import { ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined;
    allPosts: Post[],
    postFormValidationConfig: ValidationConfig<Post>
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    postFormValidationConfig: {
        title: Validators.required()
    }
}