import * as React from "react";
import { Listview } from "../components/listview/listview";
import { Link } from "react-router-dom";
import { LinkDetails, LinkPreviewDetails } from "../components/link_details/link_details";
import { CommunityDetails } from "../components/community_details/community_details";

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
                                return (

                                    <LinkDetails key={linkIndex} {...link} />

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
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinkPreviewDetails[];
}