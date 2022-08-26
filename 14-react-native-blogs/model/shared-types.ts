import { Post, PostStatus } from "./posts.model";
import { Todo } from "./todo.model";

export type IdType = number | undefined

export type Identifiable<K> = { id: K }

export interface ImageData {
  uri: string;
  localUri?: string;
  format?: string;
  width?: number;
  height?: number;
}

export type FormFieldDict<Value> = {
  [field: string]: Value
};

export type Optional<V> = V | undefined

export interface TodoListener {
  (todo: Todo): void;
}

export interface PostListener {
  (post: Post): void;
}

export type FilterType = PostStatus | undefined;

export interface FilterChangeListener {
  (filter: FilterType): void;
}




