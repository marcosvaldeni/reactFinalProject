import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

interface HeaderInternalProps {
    token: string | null
}

interface HeaderInternalState {
    userName: string | null
}

class HeaderInternal extends React.Component<HeaderInternalProps, HeaderInternalState> {
    public constructor(props: HeaderInternalProps) {
        super(props);
        this.state = {
            userName: null
        };
    }
    private _setName() {
        (async () => {
            if (this.props.token !== null) {
                const userName = await getProfile(this.props.token);
                this.setState({ userName: userName.email });
            }
        })();
    }
    public render() {
        return (
            <div className="top-navbar">
                <div className="container">
                    <Link className="left" to="/">Links</Link>
                    {this._setName()}
                    {this._renderLoginOrProfile()}

                </div>
            </div>
        );
    }
    private _renderLoginOrProfile() {
        if (this.props.token) {
            return <Link className="btn right" to="/profile">{this.state.userName}</Link>
        } else {
            return <React.Fragment>
                <Link className="btn right" to="/sign_in">Sign In</Link>
                <Link className="btn right" to="/sign_up">Sign Up</Link>

            </React.Fragment>
        }
    }

}

export const Header = withAuth(props => <HeaderInternal token={props.authToken} />)

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
