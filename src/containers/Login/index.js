/**
 * Created by Alexandru Huszar on 3/19/2021.
 */
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles, TextField, Grid, Button} from '@material-ui/core';
import { useOktaAuth } from '@okta/okta-react';

export const styles = theme => ({
    login: {
        padding: theme.spacing(2),
    },
})

/**
 * Login
 */
function Login(props) {
    const {classes } = props;
    const [sessionToken, setSessionToken] = React.useState();

    const { oktaAuth } = useOktaAuth();

    // React.useEffect(() => {
    //     oktaAuth.signInWithRedirect();
    // }, [oktaAuth]);

    const handleSubmit = event => {
        event.preventDefault()
        console.log(event.target)
        const email = event.target?.email?.value;
        const password = event.target?.password?.value;

        if (email && password) {

            oktaAuth.signInWithCredentials({
                username: email,
                password
            })
                .then((res) => {
                    setSessionToken(res.sessionToken);
                    oktaAuth.token.getWithRedirect({sessionToken: res.sessionToken});
                })
                .catch((err) => {
                    console.log('Found an error', err);
                });

        }
    }

    const signIn = async (event) => {
        event.preventDefault();
        const email = event.target?.email?.value;
        const password = event.target?.password?.value;
        const transaction = await oktaAuth.signIn({
            username: email,
            password
        });

        if (transaction.status === 'SUCCESS') {
            oktaAuth.handleLoginRedirect({sessionToken: transaction.sessionToken});
            // oktaAuth.signInWithRedirect({sessionToken: transaction.sessionToken})
        } else {
            throw new Error('Could not sign in: ' + transaction.status);
        }
    }

    if (sessionToken) {
        return null;
    }
    /**
     * Render the component
     *
     * @return {JSX.Element}
     */
    return (
        <div className={classes.login}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={8}>
                    <TextField
                        id="outlined-username"
                        label="Username"
                        name="email"
                        type="text"
                        autoComplete="current-username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="outlined-username"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )

}

Login.propTypes = {
    classes: PropTypes.object,
};

Login.defaultProps = {
    classes: {},
};

export default withStyles(styles)(Login);
