import * as React from "react";
import { Listview } from "../components/listview/listview";
import { Link } from "react-router-dom";
import { LinkDetails, LinkPreviewDetails } from "../components/link_details/link_details";
import { CommunityDetails } from "../components/community_details/community_details";
import { getAuthToken } from "../components/with_auth/with_auth";

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
}

export class Links extends React.Component<LinksProps, LinksState> {
    public constructor(props: LinksProps) {
        super(props);
        this.state = {
            links: null,
            query: ""
        };
    }
    public componentWillMount() {
        (async () => {
            const data = await getData();
            this.setState({ links: data });
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
                                console.log("link");
                                console.log(link);
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
                (this.state.links as Array<LinkPreviewDetails>).forEach((link) => {
                    if (link.id == id) {
                        console.log("link.voteCount");
                        console.log(link);
                    }
                });

                const voted = await getData();
                this.setState({ links: voted });

                return;
                //TODO compare previous vote count
            }
            // this.setState({ links: data });
        })();
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

