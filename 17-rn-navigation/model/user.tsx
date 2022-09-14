import { IdType } from "./shared-types";

export enum UserRole {
    USER = 'User', ADMIN = 'Admin'
}
export enum UserStatus {
    ACTIVE = 1, SUSPENDED, DEACTIVATED
}
export class User {
    constructor(
        public firstName : string,
        public lastName : string,
        public username : string,
        public email : string,
        public password : string,
        public role: UserRole,
        public imageUrl : string,
        public active : boolean,
        public id:IdType = undefined
    ) {}
}