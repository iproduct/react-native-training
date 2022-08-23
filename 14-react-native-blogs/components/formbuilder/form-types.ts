import { Component } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Optional } from '../../model/shared-types.js';
import { ComponentKinds } from './FormComponent.js';
import { FormDropdownComponent, FormDropdownComponentOptions } from './FormDropdownComponent.js';
import { FormTextComponentOptions } from './FormTextComponent.js';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate.js';

interface Convertor<V> {
    toString(value: V): string;
    fromString(value: string): V;
} 

export interface FormComponentConfig<V, CompKind extends ComponentKinds> {
    componentKind?: CompKind;
    id?: string;
    label?: string;
    onChange?: FormComponentListener<V>;
    options?: OptionType<CompKind>;
    valid?: ValidStatus;
    validators?: Validator | Validator[];
    convertor?: Convertor<V>;
    multiline?: boolean;
    labelStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
}

export type OptionType<CompKind extends ComponentKinds> = CompKind extends 'FormDropdownComponent' ? FormDropdownComponentOptions : FormTextComponentOptions; 

export type PropToComponentKindMapping<Entity> = {
    [Prop in keyof Entity]: ComponentKinds
}

export type FormComponentConfigs<Entity, FormConfig extends PropToComponentKindMapping<Entity>> = {
    [Prop in keyof Entity]: FormComponentConfig<Entity[Prop], FormConfig[Prop]>;
}


export interface FormComponentListener<V> {
    (value: V): void;
}

