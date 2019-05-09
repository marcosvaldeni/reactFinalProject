import React from 'react';
import { Link } from "react-router-dom";
import { getAuthToken } from "../with_auth/with_auth";

const community: React.CSSProperties = {
    borderStyle: "solid",
    borderWidth: "1px",
    height: "200px",
    width: "300px",
    padding: "30px"
};
const left: React.CSSProperties = {
    float: "left"
};

const right: React.CSSProperties = {
    float: "right"
};

const clear: React.CSSProperties = {
    clear: "both"
};

interface CommunityDetailsProps {

}

interface CommunityDetailsState {
    number: string | null,
    token: string | null
}

export class CommunityDetails extends React.Component<CommunityDetailsProps, CommunityDetailsState> {
    public constructor(props: CommunityDetails) {
        super(props);
        this.state = {
            number: null,
            token: null
        };
    }
    public componentWillMount() {
        (async () => {
            const token = getAuthToken();
            this.setState({ token: token });
            const number = await getUserCount();
            this.setState({ number: number.count });

        })();
    }
    public render() {
        return <div style={community}>
            <div style={left}>r/CCT</div>
            <div style={right}>{(this.state.number)} Users</div>
            <div style={clear}></div>
            {this._setLink()}
        </div>
    }
    private _setLink() {
        if (this.state.token !== null) {
            return <Link className="btn right" to="/link_editor">Create Post</Link>
        } else {
            return <Link className="btn right" to="/sign_in">Create Post</Link>
        }
    }
}

async function getUserCount() {
    const reponse = await fetch(
        `api/v1/users/count`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json = await reponse.json();
    return json;
}