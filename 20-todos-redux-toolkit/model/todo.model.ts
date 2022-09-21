import { IdType } from './shared-types';
export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    constructor(
        public id: IdType,
        public text: string,
        public deadline = new Date().toDateString(),
        public status = TodoStatus.Active,
    ) {}
}