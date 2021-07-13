/**
 * Created by Alexandru Huszar on 4/9/2021.
 */
import React from "react"
import PropTypes from "prop-types"

import { Container, withStyles, Grid } from '@material-ui/core';

export const styles = theme => ({})

/**
 * NotFound
 */
function NotFound(props) {
    const {classes} = props;
    /**
     * Render the component
     *
     * @return {JSX.Element}
     */
    return (
        <Container className={classes.notFound}>
            <Grid container>
                <Grid >
                    Not Found page
                </Grid>
            </Grid>
        </Container>
    )

}

NotFound.propTypes = {
    classes: PropTypes.object,
};

NotFound.defaultProps = {
    classes: {},
};

export default withStyles(styles)(NotFound);
