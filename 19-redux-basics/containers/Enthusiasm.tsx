import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import IconButton from '../components/IconButton';
import { decrementEnthusiasm, EnthusiasmAction, incrementEnthusiasm } from "../redux/actions";
import { StoreState } from "../redux/reducers";

function mapStateToProps({ enthusiasm: { enthusiasmLevel } }: StoreState) {
    return {
        enthusiasmLevel
    }
}

function mapDispatchToProps(dispatch: Dispatch<EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(incrementEnthusiasm()),
        onDecrement: () => dispatch(decrementEnthusiasm()),
    }
}

interface EnthusiasmProps {
    enthusiasmLevel: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

class Enthusiasm extends PureComponent<EnthusiasmProps> {
    render() {
        return (
            <View>
                <Text style={styles.text}>Enthusiasm Level: {this.props.enthusiasmLevel}</Text>
                <View style={styles.buttons}>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onIncrement} name='level-up' >
                        +1
                    </IconButton>
                    <IconButton size={20} backgroundColor="#ff4466" color="white"
                        onPress={this.props.onDecrement} name='level-down' >
                        -1
                    </IconButton>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enthusiasm);

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    },
})