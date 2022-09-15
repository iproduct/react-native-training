import { Credentials } from "../components/LoginForm";
import { LoggedUserData } from "../model/sign-in";
import { UsersAPI } from './rest-api-client';
import { SignInAPI } from './rest-api-auth-client';

// class LonginService {
//     private loggedUser: LoggedUserData | undefined = undefined;
//     private userApi = UsersAPI;
//     private signInApi = SignInAPI;

//     async signIn(credentials: Credentials){
//         this.loggedUser = await this.signInApi.signIn(credentials);
//         console.log(this.loggedUser);
//         return this.loggedUser;
//     }
//     signOut(){
//         this.loggedUser = undefined;
//     }
//     getLoggedUser() {
//         return this.loggedUser
//     }
//     hasLoggedUser() {
//         return !!this.loggedUser;
//     }
// }

// export const SignInService = new LonginService();