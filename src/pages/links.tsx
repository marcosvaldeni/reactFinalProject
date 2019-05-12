import * as React from "react";
import { Listview } from "../components/listview/listview";
import { LinkDetails, LinkPreviewDetails } from "../components/link_details/link_details";
import { CommunityDetails } from "../components/community_details/community_details";
import { getAuthToken } from "../components/with_auth/with_auth";

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

const links: React.CSSProperties = {
    minHeight: "550px",
    width: "760px",
    float: "left"
};

const community: React.CSSProperties = {
    float: "right"
};

const clear: React.CSSProperties = {
    clear: "both"
};

interface LinksProps {
    //
}

interface LinksState {
    links: LinkPreviewDetails[] | null;
    query: string;
    userId: number | undefined;
}

export class Links extends React.Component<LinksProps, LinksState> {
    public constructor(props: LinksProps) {
        super(props);
        this.state = {
            links: null,
            query: "",
            userId: undefined
        };
    }
    public componentWillMount() {
        (async () => {
            const data = await getData();
            this.setState({ links: data });
            const token = getAuthToken();
            if (token) {
                const user = await getProfile(token);
                this.setState({ userId: user.id });
            }
        })();
    }
    public render() {
        if (this.state.links === null) {
            return <div>Loading...</div>;
        } else {
            const filteredLinks = this.state.links.filter((link) => {
                return link.title.indexOf(this.state.query) !== -1;
            });
            return <div>
                <div style={links}>
                    <input
                        className="input-text"
                        placeholder="Search"
                        type="text"
                        onKeyUp={(e) => this._onSearch(e.currentTarget.value)}
                    />
                    <Listview
                        items={
                            filteredLinks.map((link, linkIndex) => {
                                return (

                                    <LinkDetails
                                        key={linkIndex}
                                        {...link}
                                        onUpVote={() => {
                                            this._onVote(link.id, true)
                                        }}
                                        onDownVote={() => {
                                            this._onVote(link.id, false)
                                        }}
                                        owner={this._owner(link.userId)}
                                    />

                                );
                            })
                        }
                    />
                </div>
                <div style={community}>
                    <CommunityDetails />
                </div>
                <div style={clear}></div>
            </div>;
        }

    }
    private _onSearch(query: string) {
        this.setState({ query: query });
    }
    private _onVote(id: number, isUp: boolean): void {

        (async () => {
            const data = await vote(id, isUp);
            if (data) {

                const voted = await getData();
                this.setState({ links: voted });

                return;
            }
        })();
    }
    private _owner(userId: any) {
        if (userId === this.state.userId) {
            return true;
        } else {
            return false;
        }
    }
}

export async function vote(id: number, isUp: boolean) {
    const token = getAuthToken();
    if (token) {
        const reponse = await fetch(
            `/api/v1/links/${id}/${isUp ? 'up' : 'down'}vote`,
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
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinkPreviewDetails[];
}

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

