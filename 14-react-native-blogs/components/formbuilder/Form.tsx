import { FormCancelListener, FormComponentConfigs, FormComponentListener, PropToComponentKindMapping } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig, validatorValidate, FieldValidationResult } from './validation/validate';
import { Component } from 'react';
import { View, ViewStyle, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../IconButton';
import { FormTextComponent, FormTextComponentOptions } from './FormTextComponent';
import { FormDropdownComponent, FormDropdownComponentOptions } from './FormDropdownComponent';
import { FormComponentState } from './FormComponent';
import { FormReadonlyTextComponent } from './FormReadonlyTextComponent';
import { FormImageComponent, FormImageComponentOptions } from './FormImageComponent';
import { EMPTY_IMAGE_DATA } from '../../App';
import { ImageData } from '../../model/shared-types';


interface FormProps<Entity, FormConfig extends PropToComponentKindMapping<Entity>> {
    config: FormComponentConfigs<Entity, FormConfig>;
    initialValue: Entity;
    onSubmit: FormComponentListener<Entity>;
    onCancel?: FormCancelListener;
    valid?: ValidStatus;
    formId?: number;
    style?: ViewStyle;
}

type FormState<Entity> = {
    [Prop in keyof Entity]?: FormComponentState<Entity[Prop]>
}


export class Form<Entity, FormConfig extends PropToComponentKindMapping<Entity>> extends
    Component<FormProps<Entity, FormConfig>, FormState<Entity>> {

    state: Readonly<FormState<Entity>> = this.createInitialFormState();

    handleFieldChange = (fieldName: keyof FormState<Entity> & string,
        value: string | Entity[keyof Entity & string] | undefined) => {
        const fieldConfig = this.props.config[fieldName];
        const convertor = fieldConfig.convertor;
        const validators = fieldConfig.validators;
        let fieldValue: Entity[keyof Entity & string] | undefined;
        if ((fieldConfig.componentKind === undefined || fieldConfig.componentKind === 'FormTextComponent')
            && value !== undefined && convertor) {
            fieldValue = convertor.fromString(value + '');
        } else {
            fieldValue = value as Entity[keyof Entity & string] | undefined;
        }
        let errors: FieldValidationResult = undefined;
        if (fieldValue) {
            const definedFieldValue = fieldValue;
            if (validators) {
                if (Array.isArray(validators)) {
                    errors = validators.flatMap(validator =>
                        validatorValidate<Entity[keyof Entity & string]>(validator, fieldName, definedFieldValue))
                        .filter(err => err !== undefined) as string[];
                } else {
                    errors = validatorValidate<Entity[keyof Entity & string]>(validators, fieldName, definedFieldValue)
                }
            }
        }
        const fieldUpdate = {
            value: fieldValue,
            changed: ChangedStatus.DIRTY,
            validationErrors: errors
        } as FormComponentState<Entity[typeof fieldName]>;
        this.setState({ [fieldName]: fieldUpdate } as Pick<FormState<Entity>, keyof Entity>);
    }

    handleSubmit = () => {
        const entity = { ...this.props.initialValue };
        Object.keys(this.state).forEach(field => {
            const prop = field as keyof Entity & string;
            if (typeof entity[prop] === 'string') {
                entity[prop] = this.state[prop]?.value ?? '' as Entity[keyof Entity & string];
            } else {
                entity[prop] = this.state[prop]?.value ?? entity[prop];
            }
        })
        this.props.onSubmit(entity);
    }

    createInitialFormState(): FormState<Entity> {
        return Object.keys(this.props.config).reduce(
            (prevState: Partial<FormState<Entity>>, field: string) => {
                const prop = field as keyof Entity;
                prevState[prop] = {
                    value: this.props.initialValue[prop],
                    changed: ChangedStatus.PRISTINE,
                    validationErrors: undefined,
                }
                return prevState;
            }, {} as Partial<FormState<Entity>>);
    }

    reset = () => {
        this.setState(this.createInitialFormState());
    }

    render() {
        const { config, style = {}, initialValue } = this.props;
        return (
            <ScrollView style={styles.scrollPanel}>
                <View style={{ ...styles.form, ...style }}>
                    {
                        Object.keys(config).map(field => {
                            const entityProp = field as keyof Entity & string;
                            const prop = this.state[entityProp]
                            const value = prop?.value;
                            const errors = prop?.validationErrors;
                            const erorrsStr = errors ? errors.toString() : undefined;
                            const fieldConfig = config[entityProp];
                            const convertor = fieldConfig.convertor;
                            let stringValue: string = value ? value + '' : '';
                            if (value !== undefined && convertor) {
                                stringValue = convertor.toString(value);
                            }
                            switch (fieldConfig?.componentKind) {
                                case 'FormDropdownComponent':
                                    const fieldConfigDropdown = Object.assign({}, config[entityProp],
                                        { options: fieldConfig.options as FormDropdownComponentOptions });
                                    return <FormDropdownComponent<typeof value | undefined>
                                        key={entityProp} id={entityProp} value={value}
                                        onChange={val => this.handleFieldChange(entityProp, val)}
                                        {...fieldConfigDropdown} errors={erorrsStr} />
                                case 'FormReadonlyTextComponent':
                                    const { options, onChange, ...fieldConfigReadonlyText } = config[entityProp];
                                    return <FormReadonlyTextComponent
                                        key={entityProp} id={entityProp} value={stringValue}
                                        {...fieldConfigReadonlyText} errors={erorrsStr} />
                                case 'FormImageComponent':
                                    const fieldConfigImage = Object.assign({}, fieldConfig,
                                        { options: fieldConfig.options as FormImageComponentOptions });
                                    return <FormImageComponent<typeof value | undefined>
                                        key={entityProp} id={entityProp} value={value}
                                        onChange={val => this.handleFieldChange(entityProp, val)}
                                        {...fieldConfigImage} errors={erorrsStr} />
                                default:
                                    const fieldConfigText = Object.assign({}, fieldConfig,
                                        { options: fieldConfig.options as FormTextComponentOptions });
                                    return <FormTextComponent key={entityProp} id={entityProp} value={stringValue}
                                        onChange={val => this.handleFieldChange(entityProp, val)} {...fieldConfigText}
                                        errors={erorrsStr} />
                            }
                        })
                    }
                    <View style={styles.buttons}>
                        <IconButton size={20} backgroundColor="green" color="white" onPress={this.handleSubmit} name='check-circle' >
                            Submit
                        </IconButton>
                        <IconButton size={20} backgroundColor="#ff4466" color="white" onPress={this.reset} name='times-circle' >
                            Reset
                        </IconButton>
                        <IconButton size={20} backgroundColor="gray" color="white" onPress={this.props.onCancel} name='times-circle' >
                            Cancel
                        </IconButton>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollPanel: {
        flex: 1,
        width: "100%",
    },
    form: {
        width: "95%",
        backgroundColor: "#eee",
        borderRadius: 10,
        alignItems: "stretch",
        paddingHorizontal: 10,
        paddingBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttons: {
        marginTop: 20,
        marginRight: 10,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

