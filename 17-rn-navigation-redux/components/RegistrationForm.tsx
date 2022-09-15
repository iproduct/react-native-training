import React, { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { User, UserRole } from "../model/user";

interface RegistrationFormState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
}

interface RegistrationFormProps {
    onSignUp: (user: User) => void;
}

//type LoginFormState = Credentials;

const EMPTY_FORM_STATE = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    imageUrl: "",
}

export default class RegistrationForm extends Component<
    RegistrationFormProps,
    RegistrationFormState
> {
    // authContext = React.useContext(AuthContext);
    state: Readonly<RegistrationFormState> = EMPTY_FORM_STATE;

    handleTextChange = (
        field: keyof RegistrationFormState & string,
        value: string
    ) => {
        this.setState({ [field]: value } as Pick<
            RegistrationFormState,
            keyof RegistrationFormState
        >);
    };

    handleSignUp = async () => {
        try {
            const newUser = new User(
                this.state.firstName,
                this.state.lastName,
                this.state.username,
                this.state.email,
                this.state.password,
                UserRole.USER,
                this.state.imageUrl,
                true
            );
            console.log(newUser);

            // await SignInAPI.signUp(newUser);
            this.props.onSignUp(newUser);
            this.setState(EMPTY_FORM_STATE);
        } catch (err) {
            console.log("====================================");
            console.log("can not be created");
            console.log("====================================");
        }
    };

    render() {
        return (

            <View style={styles.container}>
                <TextInput
                    onChangeText={this.handleTextChange.bind(this, "firstName")}
                    placeholder="First Name"
                    style={styles.input}
                /><TextInput
                    onChangeText={this.handleTextChange.bind(this, "lastName")}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={this.handleTextChange.bind(this, "username")}
                    placeholder="Username"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={this.handleTextChange.bind(this, "email")}
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={this.handleTextChange.bind(this, "password")}
                    secureTextEntry={true}
                    placeholder="Password"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={this.handleTextChange.bind(this, "imageUrl")}
                    placeholder="Image URL"
                    style={styles.input}
                />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => this.handleSignUp()}
                        title="Sign Up"
                        color="#542867"
                        accessibilityLabel="SignUp"
                    />
                    {/* <Button
            onPress={() => authContext?.signUp({ username, password })}
            title="Sign Up"
            color="#841584"
            accessibilityLabel="SignUp"
          /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B2C8DF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 20,
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
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10,
    },
});