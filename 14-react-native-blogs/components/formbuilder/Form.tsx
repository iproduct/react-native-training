import { FormComponentConfigs, FormComponentListener, PropToComponentKindMapping } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { Component } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import IconButton from '../IconButton';
import { FormTextComponent, FormTextComponentOptions } from './FormTextComponent';
import { FormDropdownComponent, FormDropdownComponentOptions } from './FormDropdownComponent';
import { FormComponentState } from './FormComponent';
import { AnyConfiguration } from '@expo/webpack-config/webpack/types';



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
    [Prop in keyof Entity]: FormComponentState<Entity[Prop]>
}


export class Form<Entity, FormConfig extends PropToComponentKindMapping<Entity>> extends
    Component<FormProps<Entity, FormConfig>, FormState<Entity>> {

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

