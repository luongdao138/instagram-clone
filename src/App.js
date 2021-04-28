import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as routes from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
import ProtectedRoute from './helpers/ProtectRoute';
import UserLoggedIn from './helpers/UserLoggedIn';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AddPost = lazy(() => import('./pages/AddPost'));
const Profile = lazy(() => import('./pages/Profile'));
const EditAccount = lazy(() => import('./pages/EditAccount'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>This page is loading...</p>}>
          <Switch>
            <ProtectedRoute user={user} path={routes.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute path={routes.ADD} user={user}>
              <AddPost />
            </ProtectedRoute>
            <ProtectedRoute path={routes.EDIT_PROFILE} user={user}>
              <EditAccount />
            </ProtectedRoute>

            <ProtectedRoute path={routes.PROFILE} user={user}>
              <Profile />
            </ProtectedRoute>

            <UserLoggedIn
              user={user}
              loggedInPath={routes.DASHBOARD}
              path={routes.SIGNUP}
            >
              <Signup />
            </UserLoggedIn>
            <UserLoggedIn
              user={user}
              loggedInPath={routes.DASHBOARD}
              path={routes.LOGIN}
            >
              <Login />
            </UserLoggedIn>
            <Route path={routes.NOT_FOUND} component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
