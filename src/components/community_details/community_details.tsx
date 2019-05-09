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
            console.log(token);
            this.setState({ token: token });
            const number = await getUserCount();
            this.setState({ number: number.count });
            console.log(number);

        })();
    }
    public render() {
        return <div style={community}>
            <div style={left}>r/CCT</div>
            <div style={right}>{(this.state.number)} Users</div>
            <div style={clear}></div>
            <button>Create Post</button>
        </div>
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