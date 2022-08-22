import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';

export interface FormComponentProps<V, OT> {
    id: string;
    readonly initialValue: V;
    label?: string;
    onChange?: FormComponentListener<V>;
    valid?: ValidStatus;
    validators?: Validator | Validator[];
    options?: OT;
    // multiline?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
}

export interface FormComponentState<V> {
    value: V,
    changed: ChangedStatus;
    valid: ValidStatus;
    validationErrors: string[];
}

export type ComponentKinds = 'FormTextComponent' | 'FormDropdownComponent';

export interface FormComponent<V, OT> extends Component<FormComponentProps<V, OT>, FormComponentState<V>> {
    componentKind: ComponentKinds;
}