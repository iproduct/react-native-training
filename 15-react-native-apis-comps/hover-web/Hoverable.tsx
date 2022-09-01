import { isHoverEnabled } from "./HoverState";
import { element, func, oneOfType } from "prop-types";
import React, { Component, JSXElementConstructor, ReactElement, ReactNode } from "react";

interface HoverableProps {
    children: ReactNode | ((hover:boolean) => ReactNode);
    onHoverIn: () => void;
    onHoverOut: () => void;
}

interface HoverableState{
    isHovered: boolean;
    showHover: boolean;
}

export default class Hoverable extends Component<HoverableProps, HoverableState> {
    state: Readonly<HoverableState> = { isHovered: false, showHover: true };

    _handleMouseEnter = (e: any) => {
        if (isHoverEnabled() && !this.state.isHovered) {
            const { onHoverIn } = this.props;
            if (onHoverIn) onHoverIn();
            this.setState(state => ({ ...state, isHovered: true }));
        }
    }

    _handleMouseLeave = (e: any) => {
        if (this.state.isHovered) {
            const { onHoverOut } = this.props;
            if (onHoverOut) onHoverOut();
            this.setState(state => ({ ...state, isHovered: false }));
        }
    }

    _handleGrant() {
        this.setState(state => ({ ...state, showHover: false }));
    }

    _handleRelease = () => {
        this.setState(state => ({ ...state, showHover: true }));
    }

    render() {
        const { children, onHoverIn, onHoverOut } = this.props;
        const child =
            typeof children === "function"
                ? children(this.state.showHover && this.state.isHovered)
                : children;

        return React.cloneElement(React.Children.only(child as ReactElement<any, string | JSXElementConstructor<any>>) , {
            onMouseEnter: this._handleMouseEnter,
            onMouseLeave: this._handleMouseLeave,
            // prevent hover showing while responder
            onResponderGrant: this._handleGrant,
            onResponderRelease: this._handleRelease,
            // if child is Touchable
            onPressIn: this._handleGrant,
            onPressOut: this._handleRelease
        });
    }
}

