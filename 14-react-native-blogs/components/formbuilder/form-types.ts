import { Component } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ComponentKinds } from './FormComponent.js';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate.js';

export interface FormComponentConfig<V> {
    componentKind?: ComponentKinds;
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

