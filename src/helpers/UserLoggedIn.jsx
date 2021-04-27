import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const UserLoggedIn = ({ user, children, loggedInPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return children;

        return (
          <Redirect
            to={{
              pathname: loggedInPath,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default UserLoggedIn;
