import React from 'react';
import { getAuthToken } from "../components/with_auth/with_auth";
import * as H from 'history';

const community: React.CSSProperties = {
    borderStyle: "solid",
    borderWidth: "1px",
    height: "200px",
    width: "300px",
    padding: "30px"
};

interface LinkCreatorProps {
    history: H.History;
}

interface LinkCreatorState {
    title: string,
    URL: string,
    token: string | null
}

export class LinkCreator extends React.Component<LinkCreatorProps, LinkCreatorState> {
    public constructor(props: LinkCreatorProps) {
        super(props);
        this.state = {
            title: "",
            URL: "",
            token: getAuthToken()
        };
    }

    public render() {
        return (
            <div className="login-container">
                <h1>Create New Post</h1>
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
                await createLink(this.state.title, this.state.URL, this.state.token);
                this.props.history.push("/");
            } else {
                this.props.history.push("/sign_in");
            }


        })();
    }

}

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