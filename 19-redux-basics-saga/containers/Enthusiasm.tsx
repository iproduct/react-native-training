import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { decrementEnthusiasm, EnthusiasmAction, incrementEnthusiasm, incrementEnthusiasmAsyncStart } from "../redux/actions/enthusiasm-actions";
import { StoreState } from "../redux/reducers";
import { AppDispatch, RootState } from '../redux/store';

function mapStateToProps({ enthusiasm: { enthusiasmLevel, isLoading } }: StoreState) {
    return {
        enthusiasmLevel,
        isLoading,
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        onIncrement: () => dispatch(incrementEnthusiasm()),
        onIncrementAsyncStart: (val: number, amount: number) => dispatch(incrementEnthusiasmAsyncStart(val, amount)),
        onDecrement: () => dispatch(decrementEnthusiasm()),
    }
}

interface EnthusiasmProps {
    enthusiasmLevel: number;
    isLoading: boolean;
    onIncrement: () => void;
    onIncrementAsyncStart: (val: number, amount: number) => void;
    onDecrement: () => void;
}

class Enthusiasm extends PureComponent<EnthusiasmProps> {
    render() {
        return (
            <View style={styles.conatainer}>
                <Text style={styles.text}>Enthusiasm Level: {this.props.enthusiasmLevel}</Text>
                <View style={[styles.progressContainer, styles.progressHorizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" animating={this.props.isLoading} />
                </View>
                <View style={styles.buttons}>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onIncrement} name='level-up' >
                        +1
                    </IconButton>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={() => this.props.onIncrementAsyncStart(this.props.enthusiasmLevel, 10)} name='level-up' >
                        +10 Async Saga
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
    conatainer: {
        width: '80%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    progressContainer: {
        flex: 1,
        justifyContent: "center"
    },
    progressHorizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
})