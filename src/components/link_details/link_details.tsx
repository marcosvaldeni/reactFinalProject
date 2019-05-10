import React from 'react';
import { Link } from "react-router-dom";

export interface LinkPreviewDetails {
    id?: number;
    userId?: number;
    email?: string;
    title: string;
    url: string;
    dateTime?: string,
    commentCount?: number | null;
    voteCount?: number | null;
}

interface LinkDetailsProps extends LinkPreviewDetails {
    // ...
}

interface LinkDetailsState {
    //
}

export class LinkDetails extends React.Component<LinkDetailsProps, LinkDetailsState> {
    public render() {
        return (
            <table className="link-details">
                <tbody>
                    <tr>
                        {this._layout()}
                    </tr>
                </tbody>
            </table>
        );
    }
    private _layout() {
        if (this.props.dateTime !== undefined) {
            return <div>
                <td className="left">
                    <div className="vote-btn">
                        ↑
                    </div>
                    <div>{this.props.voteCount ? this.props.voteCount : 0}</div>
                    <div className="vote-btn">
                        ↓
                    </div>
                </td>
                <td className="right">
                    <div className="audit">{this._renderTimeSinceDate(this.props.dateTime)} ago by <Link to={`/profile/${this.props.userId}`}>{this.props.email}</Link></div>
                    <h2 className="title"><Link to={`/link_details/${this.props.id}`}>{this.props.title}</Link></h2>
                    <div className="url"><a href={this.props.url}>{this.props.url}</a></div>
                    <div className="comment-count">{this.props.commentCount} Comments</div>
                </td>
            </div>
        } else {
            return <div>

                <td className="right">
                    <h2 className="title"><Link to={`/link_details/${this.props.id}`}>{this.props.title}</Link></h2>
                    <div className="url"><a href={this.props.url}>{this.props.url}</a></div>
                </td>
            </div>
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
