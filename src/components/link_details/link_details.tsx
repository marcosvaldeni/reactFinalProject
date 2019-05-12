import React from 'react';
import { Link } from "react-router-dom";

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

export interface LinkPreviewDetails {
    id: number;
    userId?: number;
    email?: string;
    title: string;
    url: string;
    dateTime?: string,
    commentCount?: number | null;
    voteCount?: number | null;
}

interface LinkDetailsProps extends LinkPreviewDetails {
    onUpVote?: any;
    onDownVote?: any;
    owner: boolean;
}

interface LinkDetailsState {
    //
}

export class LinkDetails extends React.Component<LinkDetailsProps, LinkDetailsState> {
    public render() {
        return (<div> {this._layout()}</div>);
    }
    private _layout() {
        if (this.props.dateTime !== undefined) {
            return <div className="linkContainer">
                <div className="linkVote alingLeft">

                    <div className={"vote-btn"} onClick={this.props.onUpVote}>
                        ↑
                    </div>

                    <div>{this.props.voteCount ? this.props.voteCount : 0}</div>

                    <div className={"vote-btn"} onClick={this.props.onDownVote}>
                        ↓
                    </div>

                </div>
                <div className="linkContent alingLeft">
                    <div className="audit">{this._renderTimeSinceDate(this.props.dateTime)} ago by <Link to={`/profile/${this.props.userId}`}>{this.props.email}</Link></div>
                    <h2 className="title"><Link to={`/link_details/${this.props.id}`}>{this.props.title}</Link></h2>
                    <div className="url"><a href={this.props.url}>{this.props.url}</a></div>
                    <p>{this.props.commentCount} Comments </p>
                    {this._onwerIcons()}
                </div>
                <div className="clear"></div>
            </div>
        } else {
            return <div className="linkContainer" style={{ padding: "20px", margin: "0 0 10px 0" }}>
                <h2 className="title"><Link to={`/link_details/${this.props.id}`}>{this.props.title}</Link></h2>
                <div className="url"><a href={this.props.url}>{this.props.url}</a></div>
                {this._onwerIcons()}
            </div>
        }
    }
    private _onwerIcons() {
        if (this.props.owner === true) {
            return <p>
                <Link to={`/link_editor/${this.props.id}`}>
                    <img width="3%" height="3%" src="https://image.flaticon.com/icons/svg/63/63358.svg" alt="" />
                </Link>
                <Link to={`/link_delete/${this.props.id}`}>
                    <img width="3%" height="3%" src="https://image.flaticon.com/icons/svg/63/63260.svg" alt="" />
                </Link>
            </p>
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
