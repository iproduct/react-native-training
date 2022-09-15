import React from "react";
import { Credentials } from "../components/LoginForm";
import { LoggedUserData } from "./sign-in";
import { User } from "./user";


/* Redux types */
export interface ReduxStoreState {
    isLoading: boolean;
    isSignout: boolean;
    isSignUp: boolean;
    loggedUser: LoggedUserData | null,
}

export type AuthActionType = 'RESTORE_TOKEN' | 'SIGN_IN_START' | 'SIGN_IN_SUCCESS' | 'SIGN_OUT' | 'SIGN_UP';

export interface AuthAction {
    type: AuthActionType;
    loggedUser: LoggedUserData | null;
}

/* LoginService interface */
export interface LoginService {
    signInStart: () => void;
    signInComplete: (credentials: Credentials) => void;
    signUpStart: () => void;
    signUpComplete: (user: User) => void;
    signOut: () => void;
}


/* Create gobal contexts */
export const AuthContext = React.createContext<LoginService>({
    signInStart() { },
    signInComplete(credentials: Credentials) { },
    signUpStart() { },
    signUpComplete(user: User) { },
    signOut() { },
});

export const INITIAL_AUTH_STORE_STATE = {
    isLoading: true,
    isSignout: false,
    isSignUp: false,
    loggedUser: null,
};

export const StoreStateContext = React.createContext<ReduxStoreState>(INITIAL_AUTH_STORE_STATE);
