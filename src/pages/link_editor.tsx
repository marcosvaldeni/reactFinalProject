import React from 'react';
import { getAuthToken } from "../components/with_auth/with_auth";
import { withRouter } from "react-router";
import * as H from 'history';

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

interface LinkCreatorProps {
    history: H.History;
    id: number | undefined
}

interface LinkCreatorState {
    title: string,
    URL: string,
    token: string | null
}

export class LinkCreatorInternal extends React.Component<LinkCreatorProps, LinkCreatorState> {
    public constructor(props: LinkCreatorProps) {
        super(props);
        this.state = {
            title: "",
            URL: "",
            token: getAuthToken()
        };
    }
    public componentDidMount() {

        (async () => {

            if (this.props.id !== undefined) {
                const link = await getLinkById(this.props.id);
                this.setState({ title: link.title, URL: link.url });

            }
        })();
    }
    public render() {
        return (
            <div className="login-container">
                <h1>{this.props.id ? "Editing Post" : "Create New Post"}</h1>
                <div>
                </div>
                <div>

                    <input
                        className="input-text"
                        style={{ width: "94%" }}
                        type="text"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.currentTarget.value })}
                    />
                </div>
                <div>
                    <input
                        className="input-text"
                        style={{ width: "94%" }}
                        type="text"
                        placeholder="Link Address"
                        value={this.state.URL}
                        onChange={(e) => this.setState({ URL: e.currentTarget.value })}
                    />
                </div>
                <div>
                    <button
                        onClick={() => this._handleSubmit()}
                        className="btn"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
    private _handleSubmit() {
        (async () => {

            if (this.state.token) {

                if (this.props.id) {
                    await updateLink(this.props.id, this.state.title, this.state.URL, this.state.token);
                } else {
                    await createLink(this.state.title, this.state.URL, this.state.token);
                }
                this.props.history.push("/");
            } else {
                this.props.history.push("/sign_in");
            }
        })();
    }

}

export const LinkCreator = withRouter(props => <LinkCreatorInternal id={props.match.params.id} history={props.history} />);

async function createLink(title: string, url: string, jwt: string) {
    const data = {
        title: title,
        url: url
    };
    const response = await fetch(
        "/api/v1/links",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}

async function getLinkById(id: number) {
    const response = await fetch(`/api/v1/links/${id}`);
    const json = await response.json();
    return json;
}

async function updateLink(id: number, contentTitle: string, contentUrl: string, jwt: string) {
    const update = {
        title: contentTitle,
        url: contentUrl
    };
    const response = await fetch(
        `/api/v1/links/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}