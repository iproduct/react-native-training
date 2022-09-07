import React, { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const color = {
        color: isDarkMode ? 'white' : 'black',
    };
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    color,
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    color,
                ]}>
                {children}
            </Text>
        </View>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'gray' : 'lightgray',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}>
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.tsx</Text> to
                        change this screen and then come back to see your edits. TEST123
                    </Section>
                    <Section title="Learn More">
                        Read the docs to discover what to do next:
                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
