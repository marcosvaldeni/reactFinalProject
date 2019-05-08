import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";

interface PageHeaderInternalProps {
    token: string | null;
}

interface PageHeaderInternalState {}

class PageHeaderInternal extends React.Component<PageHeaderInternalProps, PageHeaderInternalState> {
    public render() {
        return (
            <div className="top-navbar">
                <div className="container">
                    <Link className="left" to="/">Links</Link>
                    {this._renderLoginOrProfile()}
                </div>
            </div>
        );
    }
    private _renderLoginOrProfile() {
        if (this.props.token) {
            return <Link className="btn right" to="/profile">User Profile</Link>
        } else {
            return <React.Fragment>
                <Link className="btn right" to="/sign_in">Sign In</Link>
                <Link className="btn right" to="/sign_up">Sign Up</Link>
            </React.Fragment>
        }
    }
}

export const PageHeader = withAuth(props => <PageHeaderInternal token={props.authToken} />)

