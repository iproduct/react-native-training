

export type IdType = string | undefined

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





