import React from 'react';
import { getAuthToken } from "../components/with_auth/with_auth";
import { withRouter } from "react-router";
import * as H from 'history';

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

interface LinkDeleteProps {
    history: H.History;
    id: number | undefined
}

interface LinkDeleteState {
    title: string,
    URL: string,
    token: string | null
}

export class LinkDeleteInternal extends React.Component<LinkDeleteProps, LinkDeleteState> {
    public constructor(props: LinkDeleteProps) {
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
            } else {
                this.props.history.push("/");
            }
        })();
    }
    public render() {
        return (
            <div className="login-container">
                <h1>Do you confirm the deletion of the post?</h1>

                <h2>{this.state.title}</h2>
                <p>{this.state.URL}</p>

                <div>
                    <button
                        onClick={() => this._handleSubmit()}
                        className="btn"
                        style={{ width: "100%" }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        );
    }
    private _handleSubmit() {
        (async () => {

            if (this.state.token) {

                if (this.props.id) {
                    await deleteLinkById(this.props.id, this.state.token);
                } else {
                    this.props.history.push("/");
                }
                this.props.history.push("/");
            } else {
                this.props.history.push("/sign_in");
            }
        })();
    }

}

export const LinkDelete = withRouter(props => <LinkDeleteInternal id={props.match.params.id} history={props.history} />);

async function deleteLinkById(id: number, jwt: string) {
    const response = await fetch(
        `/api/v1/links/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            }
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

