import React from 'react';

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

const container: React.CSSProperties = {
    borderStyle: "solid",
    borderWidth: "1px",
    minHeight: "200px",
    width: "300px",
    padding: "30px",
    float: "right"
};

interface UserDetailsProps {
    email: string,
    img: string | null,
    bio: string | null

}

interface UserDetailsState { }

export class UserDetails extends React.Component<UserDetailsProps, UserDetailsState> {
    public render() {
        return <div style={container}>
            {this._showImg()}
            <p><b>{this.props.email}</b></p>
            {this.props.bio}
        </div>
    }
    private _showImg() {

        if (this.props.img !== null) {
            return <p><img src={this.props.img} alt="" /></p>
        } else {
            return <img src="https://www.kwsme.com/wp-content/uploads/2016/06/login-user-icon.png" alt="" />
        }

    }
}
