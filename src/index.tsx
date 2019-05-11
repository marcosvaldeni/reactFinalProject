import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import './css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Links } from "./pages/links";
import { LinkDetails } from './pages/link_details';
import { SignIn, SignUp } from './pages/login';
import { Profile } from './pages/profile';
import { LinkCreator } from './pages/link_creation';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Header />

            <div className="container">
                <Switch>
                    <Route exact path="/" component={Links} />
                    <Route exact path="/link_details/:id" component={LinkDetails} />
                    <Route exact path="/sign_in" component={SignIn} />
                    <Route exact path="/sign_up" component={SignUp} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/link_editor/:id" component={LinkCreator} />
                    <Route exact path="/link_editor" component={LinkCreator} />
                </Switch>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
