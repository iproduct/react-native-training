import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { decrementEnthusiasm, EnthusiasmAction, incrementEnthusiasm, incrementEnthusiasmAsyncStart } from "../redux/actions/enthusiasm-actions";
import { suggestionRequestCanceled, suggestionRequested } from '../redux/actions/suggestion-actions';
import { StoreState } from "../redux/reducers";
import { AppDispatch, RootState } from '../redux/store';

function mapStateToProps({ suggestions: { suggestions, isLoading } }: StoreState) {
    return {
        suggestions,
        isLoading,
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        onSuggestionRequested: () => dispatch(suggestionRequested()),
        onSuggestionCanceled: () => dispatch(suggestionRequestCanceled()),
    }
}

interface SuggestionsProps {
    suggestions: number[];
    isLoading: boolean;
    onSuggestionRequested: () => void;
    onSuggestionCanceled: () => void;
}

interface SuggestionsLocalState {
    text: string,
}

class Suggestions extends PureComponent<SuggestionsProps, SuggestionsLocalState> {
    state = {
        text: ''
    }

    handleTextChange = (text: string) => {
        this.setState({ text })
        this.props.onSuggestionRequested();
    }

    render() {
        return (
            <View style={styles.conatainer}>
                <Text style={styles.text}>Susggestions: {this.props.suggestions.join(' | ')}</Text>
                <View style={[styles.progressContainer, styles.progressHorizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" animating={this.props.isLoading} />
                </View>
                <View style={styles.buttons}>
                    <TextInput style={styles.textInput} value={this.state.text} onChangeText={this.handleTextChange} />
                    <IconButton size={20} backgroundColor="green" color="white"
                        onPress={this.props.onSuggestionRequested} name='level-up' >
                        Get a Suggestion
                    </IconButton>
                    <IconButton size={20} backgroundColor="red" color="white"
                        onPress={this.props.onSuggestionCanceled} name='crosshairs' >
                        Cancel
                    </IconButton>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);

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