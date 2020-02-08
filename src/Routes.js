import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Notes from "./containers/Notes";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";
import Settings from "./containers/Settings";
import ChangeEmail from "./containers/ChangeEmail";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={appProps} />

    <UnauthenticatedRoute path="/login" exact component={Login} props={appProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={appProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} props={appProps} />

    <AuthenticatedRoute path="/settings" exact component={Settings} props={appProps} />
    <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} props={appProps} />
    <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} props={appProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={appProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={appProps} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
