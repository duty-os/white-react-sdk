import * as React from "react";

import {Component, CSSProperties, ReactNode} from "react";
import {Room} from "white-web-sdk";

export type RoomWhiteboardProps = {
    room: Room;
    className?: string;
    style?: CSSProperties;
    ref?: (elementRef: HTMLDivElement | null) => void;
};

export class RoomWhiteboard extends Component<RoomWhiteboardProps, {}> {

    private elementRef: HTMLDivElement | null = null;

    public componentWillReceiveProps?(nextProps: Readonly<RoomWhiteboardProps>): void {
        if (this.props.room !== nextProps.room) {
            this.props.room.bindHtmlElement(null);
            if (this.elementRef) {
                nextProps.room.bindHtmlElement(this.elementRef);
            }
        }
    }

    private setElementRef = (elementRef: HTMLDivElement | null): void => {
        if (this.elementRef !== elementRef) {
            this.elementRef = elementRef;
            this.props.room.bindHtmlElement(elementRef);
        }
        if (this.props.ref) {
            this.props.ref(elementRef);
        }
    }

    public render(): ReactNode {
        return (
            <div className={this.props.className}
                 style={this.props.style}
                 ref={this.setElementRef}/>
        );
    }
}