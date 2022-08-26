import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig, FieldValidationResult } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Optional } from '../../model/shared-types';

export interface FormComponentProps<V, OT = {}> {
    id: string;
    value: V;
    label?: string;
    onChange?: FormComponentListener<V>;
    options?: OT;
    errors?: Optional<string>
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
}

export interface FormComponentState<V> {
    value: V,
    changed: ChangedStatus;
    validationErrors: FieldValidationResult;
}

export type ComponentKinds = 'FormTextComponent' | 'FormReadonlyTextComponent' | 'FormDropdownComponent' | 'FormImageComponent';

export interface FormComponent<V, OT = {}> extends Component<FormComponentProps<V, OT>> {
    componentKind: ComponentKinds;
}