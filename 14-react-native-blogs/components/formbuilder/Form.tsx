import { FormComponentConfigs, FormComponentListener, PropToComponentKindMapping } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { Component } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import IconButton from '../IconButton';
import { FormTextComponent, FormTextComponentOptions } from './FormTextComponent';
import { FormDropdownComponent, FormDropdownComponentOptions } from './FormDropdownComponent';
import { FormComponentState } from './FormComponent';
import { AnyConfiguration } from '@expo/webpack-config/webpack/types';
import { FormReadonlyTextComponent } from './FormReadonlyTextComponent';



interface FormProps<Entity, FormConfig extends PropToComponentKindMapping<Entity>> {
    config: FormComponentConfigs<Entity, FormConfig>;
    initialValue: Entity;
    onSubmit: FormComponentListener<Entity>;
    validationConfig?: ValidationConfig<Entity>;
    valid?: ValidStatus;
    formId?: number;
    style?: StyleProp<ViewStyle>;
}

type FormState<Entity> = {
    [Prop in keyof Entity]?: FormComponentState<Entity[Prop]>
}


export class Form<Entity, FormConfig extends PropToComponentKindMapping<Entity>> extends
    Component<FormProps<Entity, FormConfig>, FormState<Entity>> {

    state: Readonly<FormState<Entity>> = this.createInitialFormState();

    handleFieldChange = (fieldName: keyof FormState<Entity> & string,
        value: string | Entity[keyof Entity & string] | undefined) => {
        const fieldUpdate = {
            value: value,
            changed: ChangedStatus.PRISTINE,
            valid: ValidStatus.INVALID,
            validationErrors: []
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
        this.reset();
    }

    createInitialFormState(): FormState<Entity> {
        return Object.keys(this.props.config).reduce(
            (prevState: Partial<FormState<Entity>>, field: string) => {
                const prop = field as keyof Entity;
                prevState[prop] = {
                    value: this.props.initialValue[prop],
                    changed: ChangedStatus.PRISTINE,
                    valid: ValidStatus.INVALID,
                    validationErrors: [],
                }
                return prevState;
            }, {} as Partial<FormState<Entity>>);
    }

    reset() {
        this.setState(this.createInitialFormState());
    }

    render() {
        const { config, style = {}, initialValue } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={style}>
                    {
                        Object.keys(config).map(field => {
                            const entityProp = field as keyof Entity & string;
                            const value = this.state[entityProp]?.value;
                            const fieldConfig = config[entityProp];
                            switch (fieldConfig?.componentKind) {
                                case 'FormDropdownComponent':
                                    const fieldConfigDropdown = Object.assign({}, config[entityProp],
                                        { options: fieldConfig.options as FormDropdownComponentOptions });
                                    return <FormDropdownComponent<typeof value | undefined>
                                        key={entityProp} id={entityProp} value={value}
                                        onChange={val => this.handleFieldChange(entityProp, val)}
                                        {...fieldConfigDropdown} />
                                case 'FormReadonlyTextComponent':
                                    const { options, onChange, ...fieldConfigReadonlyText } = config[entityProp];
                                    return <FormReadonlyTextComponent
                                        key={entityProp} id={entityProp} value={value ? value + '' : ''}
                                        {...fieldConfigReadonlyText} />
                                default:
                                    const fieldConfigText = Object.assign({}, config[entityProp],
                                        { options: fieldConfig.options as FormTextComponentOptions });
                                    return <FormTextComponent key={entityProp} id={entityProp} value={value ? value + '' : ''}
                                        onChange={val => this.handleFieldChange(entityProp, val)} {...fieldConfigText} />
                            }
                        })
                    }
                    <View style={styles.buttons}>
                        <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleSubmit} name='check-circle' >
                            Add TODO
                        </IconButton>
                        <IconButton size={30} backgroundColor="red" color="white" onPress={this.reset} name='times-circle' >
                            Reset
                        </IconButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
});

