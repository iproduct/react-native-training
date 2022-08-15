import { IdType } from './shared-types';
export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    id: IdType;
    constructor(
        public text: string,
        public deadline = new Date().toDateString(),
        public status = TodoStatus.Active,
    ) {}
}