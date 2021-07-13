import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {useHistory} from 'react-router-dom';

import { Button, Link } from '@material-ui/core';



const Home = () => {
    const history = useHistory();
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUserInfo(null);
        } else {
            oktaAuth.getUser().then((info) => {
                setUserInfo(info);
            });
        }
    }, [authState, oktaAuth]); // Update if authState changes

    const login = async () => {
        history.push('/login');
    };

    if (!authState) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
                { authState.isAuthenticated && !userInfo
                && <div>Loading user information...</div>}

                {authState.isAuthenticated && userInfo
                && (
                    <div>
                        <p>
                            Welcome, &nbsp;
                            {userInfo.name}
                            !
                        </p>
                        <Button component={Link} href="/profile">My Profile</Button>
                    </div>
                )}

                {!authState.isAuthenticated
                && (
                    <div>
                        <p>Successfully started this React application.</p>

                        <Button onClick={login}>Login</Button>
                    </div>
                )}
        </div>
    );
};

export default Home;
