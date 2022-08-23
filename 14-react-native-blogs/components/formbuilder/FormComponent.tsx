import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Optional } from '../../model/shared-types';

export interface FormComponentProps<V, OT = {}> {
    id: string;
    value: V;
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

export type ComponentKinds = 'FormTextComponent' | 'FormReadonlyTextComponent' | 'FormDropdownComponent';

export interface FormComponent<V, OT = {}> extends Component<FormComponentProps<V, OT>> {
    componentKind: ComponentKinds;
}