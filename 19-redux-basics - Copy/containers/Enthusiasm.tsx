import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import IconButton from '../components/IconButton';
import { decrementEnthusiasm, EnthusiasmAction, incrementAsync, incrementEnthusiasm, incrementLogged } from "../redux/actions";
import { StoreState } from "../redux/reducers";
import { RootState } from '../redux/store';

function mapStateToProps({ enthusiasm: { enthusiasmLevel } }: StoreState) {
    return {
        enthusiasmLevel
    }
}

function mapDispatchToProps(dispatch :ThunkDispatch<RootState, undefined, EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(incrementEnthusiasm()),
        onIncrementLogged: () => dispatch(incrementLogged(10)),
        onIncrementAsync: () => dispatch(incrementAsync(15, 2000)),
        onDecrement: () => dispatch(decrementEnthusiasm()),
    }
}

interface EnthusiasmProps {
    enthusiasmLevel: number;
    onIncrement: () => void;
    onIncrementLogged: () => void;
    onIncrementAsync: () => void;
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
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onIncrementLogged} name='level-up' >
                        +10 Logged
                    </IconButton>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onIncrementAsync} name='level-up' >
                        +15 Async
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
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    },
})