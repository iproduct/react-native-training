import { Post } from "./posts.js";
import { FormState, ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined;
    allPosts: Post[],
    postFormValidationConfig: ValidationConfig<Post>,
    postFormErrors: string[],
    postFormState: FormState<Post>
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    postFormValidationConfig: {
        title: Validators.required()
    },
    postFormErrors: [],
    postFormState: {}
}