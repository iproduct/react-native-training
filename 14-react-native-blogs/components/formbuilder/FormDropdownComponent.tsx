import { FormComponentListener, OptionType, PropToComponentKindMapping } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps } from './FormComponent';
import { Picker } from '@react-native-picker/picker';

export interface DropdownChoice {
    value: number;
    label: string;
}

export interface FormDropdownComponentOptions {
    choices?: DropdownChoice[];
    hasUndefinedChoice?: boolean;
    itemStyle?: TextStyle;
}
//OptionType<FormConfig[keyof V & string]> | undefined
export class FormDropdownComponent<V = number>
    extends Component<FormComponentProps<V, OptionType<'FormDropdownComponent'>>>
    implements FormComponent<V, OptionType<'FormDropdownComponent'>> {
    componentKind = 'FormDropdownComponent' as const;

    handleFieldChanged = (value: V) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        let { id,
            value,
            label = capitalize(id),
            options: { choices = [], hasUndefinedChoice = true, itemStyle = {} } =
            { choices: [], hasUndefinedChoice: true, itemStyle: {} },
            style = {},
            labelStyle = {},
            inputStyle = {}
        } = this.props;
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <Picker
                    style={{ ...styles.input, ...inputStyle }}
                    itemStyle={{ ...styles.item, ...itemStyle }}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                        this.handleFieldChanged(itemValue)
                    }>
                    {hasUndefinedChoice && <Picker.Item key='undefined' label="--" value="undefined" />}
                    {choices.map(choice => (<Picker.Item key={choice.value} label={choice.label} value={choice.value}
                        style={{ ...styles.item, ...itemStyle }} />))}
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
    item: {
        fontSize: 20,
    },
    input: {
        fontSize: 20,
        padding: 5,
        borderColor: 'red',
        borderWidth: 1,
        height: 40,
    },
});
