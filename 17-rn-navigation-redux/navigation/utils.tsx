import { useNavigation, useRoute } from "@react-navigation/native";
import { ReactNode } from "react";

export function withNavigationAndRoute<P extends object>(WrappedComponent: React.ComponentType<P>) {

    return (props: P) => {
        const navigation = useNavigation();
        const route = useRoute();
        return <WrappedComponent {...props} navigation={navigation} route={route} />;
    }
}

export function withNavigation<P extends object>(WrappedComponent: React.ComponentType<P>) {

    return (props: P) => {
        const navigation = useNavigation();
        return <WrappedComponent {...props} navigation={navigation} />
    }
}

export function withRoute<P extends object>(WrappedComponent: React.ComponentType<P>) {

    return (props: P) => {
        const route = useRoute();
        return <WrappedComponent {...props} route={route} />
    }
}

