import React from 'react';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Route, useHistory, withRouter, Switch } from 'react-router-dom';
import Profile from '../Profile';
import NotFound from '../NotFound';
import Login from '../Login';
import Home from '../Home';

import { config } from '../../config';


const oktaAuth = new OktaAuth({
    issuer: config.okta.oidc.issuer,
    clientId: config.okta.oidc.clientId,
    redirectUri: `${window.location.origin}/login/callback`,
    pkce: true,
});

const App = () => {
    const history = useHistory();
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        console.log(originalUri);
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
    const customAuthHandler = (oktaAuth) => {
        // Redirect to the /login page that has a CustomLoginComponent
        // This example is specific to React-Router
        history.push('/login');
    };

    return (
        <Security
            oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}
            onAuthRequired={customAuthHandler}
        >
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/login/callback' component={LoginCallback} />
                <Route path='/login'  component={Login} />
                <SecureRoute path='/profile' component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Security>
    );
};


export default withRouter(App);
