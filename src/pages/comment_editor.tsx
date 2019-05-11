import React from 'react';
import { getAuthToken } from "../components/with_auth/with_auth";
import * as H from 'history';

interface CommentEditorProps {
    id: string;
    history: H.History;
}

interface CommentEditorState {
    comment: string,
    token: string | null
}

export class CommentEditor extends React.Component<CommentEditorProps, CommentEditorState> {
    public constructor(props: CommentEditorProps) {
        super(props);
        this.state = {
            comment: "",
            token: getAuthToken()
        };
    }
    public componentWillMount() {
        (async () => {
            if (this.props.id) {

            }
        })();
    }
    public render() {
        return (
            <div className="login-container">
                <h1>Edit Comment</h1>
                <div>
                </div>
                <div>
                    <input
                        className="input-text"
                        style={{ width: "94%" }}
                        type="text"
                        placeholder="Title"
                        value="{this.state.title}"
                        onChange={(e) => this.setState({ comment: e.currentTarget.value })}
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
                if (this.props.id !== undefined) {
                    await updateComment(this.props.id, this.state.comment, this.state.token);
                }

                this.props.history.push("/");
            } else {
                this.props.history.push("/sign_in");
            }


        })();
    }

}

async function updateComment(id: string, content: string, jwt: string) {
    const update = {
        content: content
    };
    const response = await fetch(
        `/api/v1/comments/${id}`,
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