import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';

export interface FormComponentProps<V> {
    id: string;
    readonly initialValue: V;
    label?: string;
    onChange?: FormComponentListener<V>;
    valid?: ValidStatus;
    validators?: Validator | Validator[];
    multiline?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
}

interface FormComponentState<V> {
    value: V,
    changed: ChangedStatus;
    valid: ValidStatus;
    validationErrors: string[];
}

export class FormComponent<V> extends Component<FormComponentProps<V>, FormComponentState<V>> {
    state: Readonly<FormComponentState<V>> = {
        value: this.props.initialValue,
        changed: ChangedStatus.PRISTINE,
        valid: this.props.valid || ValidStatus.INVALID,
        validationErrors: [],
    }

    handleFieldChanged = (text: string) => {
        this.setState({
            value: text as V,
            changed: ChangedStatus.DIRTY,
        });
    }

    // validate(): string[] {
    //     const errors = [] as string[];
    //     if (!this.validators) return [];
    //     if (Array.isArray(this.validators)) {
    //         for (const validator of this.validators) {
    //             try {
    //                 validator(this.value, this.id);
    //             } catch (err) {
    //                 errors.push(err as string);
    //             }
    //         }
    //     } else {
    //         try {
    //             this.validators(this.value, this.id);
    //         } catch (err) {
    //             errors.push(err as string);
    //         }
    //     }
    //     return errors;
    // }

    render() {
        let { id, initialValue, label = capitalize(id), multiline = false, style = {}, labelStyle = {}, inputStyle = {} } = this.props;
        // const validationErrors = this.validate();
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <TextInput style={{ ...styles.input, ...inputStyle }} value={this.state.value?.toString()} onChangeText={this.handleFieldChanged} />
            </View>
        );


        // return this.multiline ?
        //     `
        // <div class="input-field col s12">
        //     <textarea id="${this.id}" name="${this.id}" type="text" 
        //         class="materialize-textarea validate ${validationErrors ? 'invalid' : 'valid'}" data-property="${this.property}">${this.value}</textarea>
        //     <label for="${this.id}">${this.label}</label>
        //     <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        // </div>
        // `
        //     : this.hidden ?
        //         `
        //     <input id="${this.id}" name="${this.id}" hidden data-property="${this.property}" >
        // `
        //         :
        //         `
        // <div class="input-field col s12">
        //     <input id="${this.id}" name="${this.id}" data-property="${this.property}" type="text" class="validate ${validationErrors ? 'invalid' : 'valid'}"
        //         value="${this.value}">
        //     <label for="${this.id}">${this.label}</label>
        //     <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        // </div>
        // `
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
    form: {
        padding: 10,
        width: '100%',
    },
    label: {
        paddingTop: 15,
        fontSize: 20,
        alignSelf: 'flex-start',
        flex: 1,
    },
    input: {
        fontSize: 24,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
    },
    idField: {
        fontSize: 24,
        width: '100%',
        height: 45,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    dateChooser: {
        display: 'flex',
        flexDirection: 'row',
    },
    dateInput: {
        flex: 1,
        fontSize: 20,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttons: {
        fontSize: 45,
        marginTop: 20,
        marginBottmo: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
    },
});
