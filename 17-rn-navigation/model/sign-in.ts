import { User } from "./user";

export interface LoggedUserData {
    auth: boolean;
    user: User;
    token: string;
  }