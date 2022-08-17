import { Cat } from './cat-model';
import { Component } from "react";
import { Image, View, Text, StyleSheet } from 'react-native';


interface CatComponentProps {
    cat: Cat;
}

interface CatComponentState {
    isHungry: boolean;
}

class CatComponent extends Component<CatComponentProps, CatComponentState>  {
    state: Readonly<CatComponentState> = {
        isHungry: true
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{
                    uri: this.props.cat.pictureUrl
                }}
                    style={{ width: '400px', height: '400px' }}
                />
                <Text style={styles.text}>
                    I am {this.props.cat.name} and I am {this.state.isHungry ? ' hungry ' : ' full '}!
                </Text>
            </View>
        );
    }
}

export default CatComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24
    }
});