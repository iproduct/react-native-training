import { FormComponentConfigs, FormComponentListener, PropToComponentKindMapping } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { Component } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import IconButton from '../IconButton';
import { FormTextComponent, FormTextComponentOptions } from './FormTextComponent';
import { FormDropdownComponent, FormDropdownComponentOptions } from './FormDropdownComponent';



interface FormProps<Entity, FormConfig extends PropToComponentKindMapping<Entity>> {
    config: FormComponentConfigs<Entity, FormConfig>;
    initialValue: Entity;
    onSubmit: FormComponentListener<Entity>;
    validationConfig?: ValidationConfig<Entity>;
    valid?: ValidStatus;
    formId?: number;
    style?: StyleProp<ViewStyle>;
}

interface FormState<Entity> {

}


export class Form<Entity, FormConfig extends PropToComponentKindMapping<Entity>> extends Component<FormProps<Entity, FormConfig>, FormState<Entity>> {
    // init() {
    //     for (const elemId in this.intitialValue) {
    //         this.elements[elemId].initialValue = this.intitialValue[elemId];
    //     }
    // }

    // reset = () => {
    //     for (const elemId in this.elements) {
    //         this.elements[elemId]?.reset();
    //     }
    // }
    // validate(): ValidationResult<Entity> {
    //     const result: ValidationResult<Entity> = {};
    //     this.valid = ValidStatus.VALID;
    //     for (const elemId in this.elements) {
    //         const fieldErrors = this.elements[elemId]?.validate();
    //         if (fieldErrors && fieldErrors.length > 0) {
    //             result[elemId] = fieldErrors;
    //             this.valid = ValidStatus.INVALID;
    //         }
    //     }
    //     return result;
    // }

    // getFormSnapshot(): Entity {
    //     const result: Entity = { ...this.intitialValue };
    //     for (const elemId in this.elements) {
    //         const elemValue = this.elements[elemId].value;
    //         if (elemId in this.elements) {
    //             switch (typeof result[elemId]) {
    //                 case 'string':
    //                     result[elemId] = elemValue as unknown as Entity[Extract<keyof Entity, string>];
    //                     break;
    //                 case 'number':
    //                     result[elemId] = (!Number.isNaN(parseFloat(elemValue)) ? parseFloat(elemValue) : undefined) as unknown as Entity[Extract<keyof Entity, string>];
    //                     break;
    //                 case 'boolean':
    //                     result[elemId] = new Boolean(elemValue) as unknown as Entity[Extract<keyof Entity, string>];
    //                     break;
    //                 case 'undefined':
    //                     result[elemId] = undefined as unknown as Entity[Extract<keyof Entity, string>];
    //                     break;
    //                 case 'object':
    //                     if (Array.isArray(result[elemId])) {
    //                         result[elemId] = elemValue.split(/\W+/) as unknown as Entity[Extract<keyof Entity, string>];
    //                     } else {
    //                         throw Error("Unexpected object field type when getting form snapshot")
    //                     }
    //                     break;
    //                 default:
    //                     throw Error("Unexpected field type when getting form snapshot")
    //             }
    //         }
    //     }
    //     return result;
    // }

    render() {
        const { config, style = {}, initialValue } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={style}>
                    {
                        Object.keys(config).map(field => {
                            const entityProp = field as keyof Entity & string;
                            const initVal = initialValue[entityProp];
                            const fieldConfig = config[entityProp];
                            switch (fieldConfig?.componentKind) {
                                case 'FormDropdownComponent':
                                    const fieldConfigDropdown = Object.assign({}, config[entityProp],
                                        { options: fieldConfig.options as FormDropdownComponentOptions });
                                    return <FormDropdownComponent key={entityProp} id={entityProp} initialValue={initVal}
                                        {...fieldConfigDropdown} />
                                default:
                                    const fieldConfigText = Object.assign({}, config[entityProp],
                                        { options: fieldConfig.options as FormTextComponentOptions });
                                    return <FormTextComponent key={entityProp} id={entityProp} initialValue={initVal}
                                        {...fieldConfigText} />
                            }

                        })
                    }
                    <View style={styles.buttons}>
                        <IconButton size={30} backgroundColor="green" color="white" onPress={() => { }} name='check-circle' >
                            Add TODO
                        </IconButton>
                        <IconButton size={30} backgroundColor="red" color="white" onPress={() => { }} name='times-circle' >
                            Reset
                        </IconButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
        // ` 
        // <form id="${this.formId}" class="col s12">
        //     ${fieldsMarkup}
        //     <button class="btn waves-effect waves-light" type="submit" name="submit">Submit
        //         <i class="material-icons right">send</i>
        //     </button>
        //     <button id="${this.formId}-reset-button" class="btn waves-effect waves-light red lighten-1" type="button">Reset
        //         <i class="material-icons right">cached</i>
        //     </button>
        // </form>
        // `;
    }

    // makeInteractive() {
    //     const formElem = document.getElementById(this.formId)! as HTMLFormElement;
    //     formElem.addEventListener('submit', this.handleSubmit);
    //     const resetButton = document.getElementById(`${this.formId}-reset-button`)! as HTMLButtonElement;
    //     resetButton.addEventListener('click', this.reset);
    //     // formElem.addEventListener('change', this.validateForm, true);

    //     formElem.addEventListener('keyup', this.fieldChanged, true);

    // }

    // private fieldChanged = (event: KeyboardEvent) => {
    //     const target = event.target as HTMLInputElement;
    //     const value = (event.target as HTMLInputElement).value;
    //     if (typeof value !== 'undefined') {
    //         this.elements[target.getAttribute('data-property')! as keyof Entity].value = value as string;
    //     }
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    form: {
        padding: 10,
        width: '100%',
    },
    label: {
        paddingTop: 10,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 24,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
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

