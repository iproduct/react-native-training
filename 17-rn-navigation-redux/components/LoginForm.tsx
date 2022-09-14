import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

export interface Credentials {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSignIn(credentials: Credentials): void;
    onSignUp():void;
}

type LoginFormState = Credentials;


class LoginForm extends Component<LoginFormProps, LoginFormState> {
    state: Readonly<LoginFormState> = {
        username: '',
        password: '',
    }

    handleFieldChanged = (field: keyof Credentials & string, value: string) => {
        this.setState({ [field]: value } as Pick<Credentials, keyof Credentials>);
    }

    handleSignIn = () => {
        this.props.onSignIn({username: this.state.username, password: this.state.password});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={this.handleFieldChanged.bind(this, 'username')} placeholder="Username" style={styles.input} />
                <TextInput onChangeText={this.handleFieldChanged.bind(this, 'password')} secureTextEntry={true} placeholder="Password" style={styles.input} />
                <View style={styles.buttons}>
                    <Button
                        onPress={this.handleSignIn}
                        title="SignIn"
                        color="#542867"
                        accessibilityLabel="SignIn"
                    />
                    <Button
                        onPress={this.props.onSignUp}
                        title="SignUp"
                        color="#841584"
                        accessibilityLabel="SignUp"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B2C8DF",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        width: 200,
        margin: 5,
        borderWidth: 1,
        padding: 10,
    },
    buttons: {
        fontSize: 45,
        marginTop: 20,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 10,
    },
});

export default LoginForm;