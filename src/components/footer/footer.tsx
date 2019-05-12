import React from 'react';

/*
 * Implementing a Web UI with TypeScript and React
 * CCT College Dublin
 * Name: Marcos Valdeni Lucas - 2016280
 */

interface FooterProps { }

interface FooterState { }

export class Footer extends React.Component<FooterProps, FooterState> {
    public render() {
        return <div className="footer">
            <div className="footer-body">
                <div><img className="img" height="10%" width="10%" src="https://avatars1.githubusercontent.com/u/15179803?s=460&v=4" alt="" /></div>
                <p>Implementing a Web UI with TypeScript and React</p>
                <p>CCT College Dublin</p>
                <p>Name: Marcos Valdeni Lucas - 2016280</p>
            </div>
        </div>
    }
}
