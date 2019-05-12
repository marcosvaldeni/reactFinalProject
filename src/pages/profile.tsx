import * as React from "react";
import { getAuthToken } from "../components/with_auth/with_auth";
import { Listview } from "../components/listview/listview";
import { withRouter } from "react-router";
import { UserDetails } from "../components/user_details/user_details";
import { LinkDetails } from "../components/link_details/link_details";
import { Comment as CommentComponet } from "../components/comment/comment";

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

const activity: React.CSSProperties = {
    minHeight: "550px",
    width: "700px",
    float: "left"
};

const clear: React.CSSProperties = {
    clear: "both"
};

interface Comment {
    id: number;
    userId: number;
    linkId: number;
    content: string;
}

interface Link {
    id: number;
    title: string;
    url: string;
    userId: number;
}

interface User {
    email: string;
    pic: string | null;
    bio: string | null;
    links: Link[];
    comments: Comment[];
}

interface ProfileProps {
    id: string | undefined;
}

interface ProfileState {
    userId: number | undefined;
    user: null | User;
}

export class ProfileInternal extends React.Component<ProfileProps, ProfileState> {
    public constructor(props: ProfileProps) {
        super(props);
        this.state = {
            userId: undefined,
            user: null
        };
    }
    public componentWillMount() {
        (async () => {
            if (this.props.id) {
                const user = await getUser(this.props.id);
                this.setState({ user: user });
            } else {
                const token = getAuthToken();
                if (token) {
                    const user = await getProfile(token);
                    this.setState({ user: user });
                    this.setState({ userId: user.id });
                }
            }
        })();
    }
    public render() {
        if (this.state.user === null) {
            return <div>Loading...</div>;
        } else {
            return <div >
                <div style={activity}>
                    <Listview
                        items={
                            this.state.user.links.map(link => <div>
                                <LinkDetails id={link.id} title={link.title} url={link.url} owner={this._owner(link.userId)} />
                            </div>)
                        }
                    />
                    <Listview
                        items={
                            this.state.user.comments.map(comment => <div>
                                <CommentComponet content={comment.content} />
                            </div>)
                        }
                    />
                </div>
                {this._userDerails()}
                <div style={clear}></div>
            </div>
        }
    }
    private _userDerails() {
        if (this.state.user !== null) {
            return <UserDetails email={this.state.user.email} img={this.state.user.pic} bio={this.state.user.bio} />
        }
    }
    private _owner(userId: number) {
        if (userId === this.state.userId) {
            return true;
        } else {
            return false;
        }
    }
}

export const Profile = withRouter(props => <ProfileInternal id={props.match.params.id} />);

async function getProfile(token: string) {
    const reponse = await fetch(
        "/api/v1/auth/profile",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        }
    );
    const json = await reponse.json();
    return json;
}

async function getUser(id: string) {
    const reponse = await fetch(
        `/api/v1/users/${id}`,
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
