import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps } from './FormComponent';
import { Picker } from '@react-native-picker/picker';

export interface FormTextComponentOptions {
    choices?: string[];
    hasUndefinedChoice?: boolean;
    itemStyle: TextStyle;
}

export class FormDropdownComponent<V = number>
    extends Component<FormComponentProps<V, FormTextComponentOptions>, FormComponentState<V>>
    implements FormComponent<V, FormTextComponentOptions> {
    componentKind = 'FormDropdownComponent' as const;
    state: Readonly<FormComponentState<V>> = {
        value: this.props.initialValue,
        changed: ChangedStatus.PRISTINE,
        valid: this.props.valid || ValidStatus.INVALID,
        validationErrors: [],
    }

    handleFieldChanged = (value: V) => {
        this.setState({
            value: value,
            changed: ChangedStatus.DIRTY,
        });
    }

    render() {
        let { id,
            label = capitalize(id),
            options: { choices = [], hasUndefinedChoice = true, itemStyle = {} } =
            { choices: [], hasUndefinedChoice: true, itemStyle: {} },
            style = {},
            labelStyle = {},
            inputStyle = {}
        } = this.props;
        return (
            <View style={[styles.view, style]}>
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                <Picker
                    style={[styles.input, inputStyle]}
                    itemStyle={itemStyle}
                    selectedValue={this.state.value}
                    onValueChange={(itemValue, itemIndex) =>
                        this.handleFieldChanged(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        padding: 20,
    },
    label: {
        paddingTop: 15,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 24,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
    },
});
