import React from 'react';

interface FooterProps {

}

interface FooterState {

}

export class Footer extends React.Component<FooterProps, FooterState> {
    public render() {
        return <div className="footer">
            <div className="footer-body">
                <div><img className="img" height="10%" width="10%" src="https://avatars1.githubusercontent.com/u/15179803?s=460&v=4" /></div>
                Name: Marcos Valdeni Lucas
            </div>
        </div>
    }
}
