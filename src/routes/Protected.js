import React from 'react';
import { Route, Redirect } from "react-router-dom";


function Protected({ children, ...rest }) {

    return (
        <Route {...rest}
            render={({ location }) => 
                localStorage.getItem('app_token') ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
            }
        />
    )
}

export default Protected
