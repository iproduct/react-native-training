import { Component } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { FormComponent } from './FormComponent.js';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate.js';

export interface FormComponentConfig<V> {
    id?: string;
    label?: string;
    onChange?: FormComponentListener<V>;
    valid?: ValidStatus;
    validators?: Validator | Validator[];
    multiline?: boolean;
    labelStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
}

export type FormComponentConfigs<Entity> = {
    [Prop in keyof Entity]?: FormComponentConfig<Entity[Prop]>
}


export interface FormComponentListener<V> {
    (value: V): void;
}



// export type FormCheckboxComponentType = FormComponent<boolean>;

// export interface FormNumberComponentType extends FormComponent<number> {
//     min: number;
//     max: number;
// }

// export interface FormUrlComponentType extends FormComponent<string> {
//     allowRelative: boolean;
//     allowInsecure: boolean;
// }

// export type FormComponentType<Prop> =
//     Prop extends string ? FormTextComponent | FormUrlComponentType :
//     Prop extends number ? FormNumberComponentType :
//     Prop extends boolean ? FormCheckboxComponentType : never;

// export type FormComponentUnionType =
//   FormTextComponent | FormUrlComponentType | FormNumberComponentType | FormCheckboxComponentType;


