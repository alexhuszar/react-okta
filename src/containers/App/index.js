import React from 'react'
import {
    BrowserRouter as Router,
} from "react-router-dom";

import AppWithRouterAccess from './AppWithRouterAccess';

function AppRoutes() {
    return (
        <Router><AppWithRouterAccess/></Router>
    );
}

export default AppRoutes;
