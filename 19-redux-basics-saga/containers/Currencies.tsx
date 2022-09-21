import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { CurrencyUpdate } from '../model/currency-model';
import { currenciesRequestCancel, currenciesRequestStart, startSocketSubscription, stopSocketSubscription } from '../redux/actions/currency-actions';
import { StoreState } from "../redux/reducers";
import { AppDispatch } from '../redux/store';

function mapStateToProps({ currency: { updates, active } }: StoreState) {
    return {
        updates,
        active,
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        onCurrencyUpdatesStart: () => dispatch(startSocketSubscription()),
        onCurrencyUpdatesCancel: () => dispatch(stopSocketSubscription()),
    }
}

interface SuggestionsProps {
    updates: CurrencyUpdate[];
    active: boolean;
    onCurrencyUpdatesStart: () => void;
    onCurrencyUpdatesCancel: () => void;
}

interface SuggestionsLocalState {
    text: string,
}

class Currencies extends PureComponent<SuggestionsProps, SuggestionsLocalState> {
    state = {
        text: ''
    }

    render() {
        return (
            <View style={styles.conatainer}>
                <Text style={styles.text}>Currency updates: {
                    this.props.updates.map(u => `${u.currency}(${u.change})`).join(' | ')
                }</Text>
                <View style={[styles.progressContainer, styles.progressHorizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" animating={this.props.active} />
                </View>
                <View style={styles.buttons}>
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onCurrencyUpdatesStart} name='level-up' >
                        Get Currency Updates
                    </IconButton>
                    <IconButton size={20} backgroundColor="red" color="white"
                        onPress={this.props.onCurrencyUpdatesCancel} name='crosshairs' >
                        Cancel
                    </IconButton>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);

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
    textInput: {
        width: '60%',
        borderWidth: 2,
        borderColor: '#888',
        borderRadius: 10,
    }
})