
import { LoggedUserData } from './../navigation/index';
import { Credentials } from "../components/LoginForm";
import { UsersAPI } from './rest-api-client';

class LonginService {
    private loggedUser: LoggedUserData | undefined = undefined;
    private userApi= UsersAPI;
    async signIn(credentials: Credentials){
        const allUsers = await this.userApi.findAll();
        const user = allUsers.find(u => u.username === credentials.username);
        if(user !== undefined && user.password === credentials.password) {
            this.loggedUser = {user, token: 
        }
    }
    signOut(){

    }
    getLoggedUser() {
        return this.loggedUser
    }
    hasLoggedUser() {
        return !!this.loggedUser;
    }
}