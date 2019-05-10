import React from 'react';

export interface CommentDetails {
    id?: number;
    userId?: number;
    email?: string;
    content: string;
    dateTime?: string;
}

interface CommentProps extends CommentDetails {
    // ...
}

interface CommentState {
    //
}

export class Comment extends React.Component<CommentProps, CommentState> {
    public render() {
        return (
            <table className="comment-details">
                <tbody>
                    <tr>
                        <td className="right">
                            {this._layout()}

                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    private _layout() {
        if (this.props.dateTime !== undefined) {
            return <div>
                <div className="audit">{this._renderTimeSinceDate(this.props.dateTime)} ago by {this.props.email}</div>
                <p className="comment-text">{this.props.content}</p>
            </div>
        } else {
            return <p>{this.props.content}</p>
        }
    }
    private _renderTimeSinceDate(jsonDate: string) {
        const time = Date.parse(jsonDate);
        const now = new Date().getTime();
        const difference = (now - time) / 1000;
        const seconds = Math.ceil(difference);
        const minutes = Math.ceil(seconds / 60);
        const hours = Math.ceil(minutes / 60);
        const days = Math.ceil(hours / 24);
        if (seconds < 60) {
            return `${seconds} seconds`;
        } else if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (hours < 24) {
            return `${hours} hours`;
        } else {
            return `${days} days`;
        }
    }
}
