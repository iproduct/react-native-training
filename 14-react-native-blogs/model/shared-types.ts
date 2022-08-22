import { Post, PostStatus } from "./posts.model";
import { Todo } from "./todo.model";

export type IdType = number | undefined

export type Identifiable<K> = { id: K }


export type FormFieldDict<Value> = {
  [field: string]: Value
};

export type Optional<V> = V | undefined

export interface TodoListener {
  (todo: Todo): void;
}

export interface PostListener {
  (todo: Post): void;
}

export type FilterType = PostStatus | undefined;

export interface FilterChangeListener {
  (filter: FilterType): void;
}




