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
        public password : string,
        public gender : string,
        public userRole: UserRole,
        public pictureUrl : string,
        public description : string,
        public status : UserStatus,
        public registrationTimestamp : string,
        public lastModificationTimestamp : string,
        public id:IdType = undefined
    ) {}
}