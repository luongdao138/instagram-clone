import { Route, Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import React from 'react';

const ProtectRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) return children;

        return (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectRoute;
