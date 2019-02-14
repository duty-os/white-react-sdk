import * as React from "react";

import {ReactNode, CSSProperties} from "react";
import {Player} from "white-web-sdk";

export type PlayerWhiteboardProps = {
    player: Player;
    className?: string;
    style?: CSSProperties;
    ref?: (elementRef: HTMLDivElement | null) => void;
};

export class PlayerWhiteboard extends React.Component<PlayerWhiteboardProps> {

    private elementRef: HTMLDivElement | null = null;

    public componentWillReceiveProps?(nextProps: Readonly<PlayerWhiteboardProps>): void {
        if (this.props.player !== nextProps.player) {
            this.props.player.bindHtmlElement(null);
            if (this.elementRef) {
                nextProps.player.bindHtmlElement(this.elementRef);
            }
        }
    }

    private setElementRef = (elementRef: HTMLDivElement | null): void => {
        if (this.elementRef !== elementRef) {
            this.elementRef = elementRef;
            this.props.player.bindHtmlElement(elementRef);
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
