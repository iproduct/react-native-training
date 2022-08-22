import { Icon } from '@expo/vector-icons/build/createIconSet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { Component, ForwardedRef, forwardRef, ForwardRefRenderFunction, MutableRefObject, ReactNode } from 'react'
import { OpaqueColorValue, Text, TextStyle } from 'react-native';
import { IconButtonProps } from 'react-native-paper';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

interface IButtonProps {
    size?: number;
    style?: TextStyle;
    children?: ReactNode;
    backgroundColor?: string | OpaqueColorValue | undefined;
}

type IButtonPropsType = IconButtonProps & IconProps & IButtonProps;

const IconButton = React.forwardRef<any, IButtonPropsType>((props, fRef) => {
    const { name, style, size, children, color, ...other } = props;
    return (
        <FontAwesome.Button {...props} name={name as any} ref={fRef}>
            <Text style={[style, { fontSize: size, color:  color}]}>{children}</Text>
        </FontAwesome.Button>
    );
});

export default IconButton;