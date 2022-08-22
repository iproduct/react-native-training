import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps, ComponentKinds } from './FormComponent';

export interface FormTextComponentOptions {
    multiline?: boolean;
    numberOfLines?: number;
}

export class FormTextComponent<V = string>
    extends Component<FormComponentProps<V, FormTextComponentOptions>, FormComponentState<V>>
    implements FormComponent<V, FormTextComponentOptions> {
    componentKind = 'FormTextComponent' as const;
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
        let { id,
            label = capitalize(id),
            options: { multiline = false, numberOfLines = 5 } = { multiline: false },
            style = {},
            labelStyle = {},
            inputStyle = {}
        } = this.props;
        // const validationErrors = this.validate();
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <TextInput style={{ ...styles.input, ...inputStyle }} value={this.state.value?.toString()}
                    onChangeText={this.handleFieldChanged}
                    multiline={multiline} numberOfLines={numberOfLines} />
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
    label: {
        paddingTop: 5,
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
