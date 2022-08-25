import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps, ComponentKinds } from './FormComponent';

export class FormReadonlyTextComponent
    extends Component<FormComponentProps<string>>
    implements FormComponent<string> {
    componentKind = 'FormReadonlyTextComponent' as const;
    
    render() {
        let { id,
            value,
            label = capitalize(id),
            style = {},
            labelStyle = {},
            inputStyle = {}
        } = this.props;
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <Text style={styles.readonlyField}>{value + ''}</Text>
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
        padding: 5,
    },
    label: {
        paddingTop: 5,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    readonlyField: {
        fontSize: 20,
        width: '100%',
        height: 40,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    },
});
