// import packages
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// import routes
import Landing from '../../ui/pages/Landing';
import Login from '../../ui/pages/Login';
import Signup from '../../ui/pages/Signup';
import Profile from '../../ui/pages/Profile';
import PartyPage from '../../ui/pages/PartyPage';
import Dashboard from '../../ui/pages/Dashboard';
import NotFound from '../../ui/pages/Not-Found';
import RecoverPassword from '../../ui/pages/RecoverPassword';
import ResetPassword from '../../ui/pages/ResetPassword';

// import Spinner
import Spinner from '../../ui/components/Spinner';

// import hoc to pass additional props to routes
import PropsRoute from '../../ui/pages/PropsRoute';
import addVotingForms from '../../ui/pages/votingForms/addVotingForms';
import ConfirmationEmail from '../../ui/pages/ConfirmationEmail/ConfirmationEmail';
import updateInfoUser from '../../ui/pages/SettingsPage/SettingsPage'

const App = props => (
  <Router>
    <div>
      {props.loggingIn && <Spinner />}
      <Switch>
        <PropsRoute exact path="/" component={Landing} {...props} />
        <PropsRoute exact path="/login" component={Login} {...props} />
        <PropsRoute path="/signup" component={Signup} {...props} />
        <PropsRoute path="/elections" component={PartyPage} {...props} />
        <PropsRoute path="/votingforms" component={addVotingForms} {...props} />
        <PropsRoute path="/dashboard" component={Dashboard} {...props} />
        <PropsRoute exact path="/profile" component={Profile} {...props} />
        <PropsRoute exact path="/updateinfouser" component={updateInfoUser} {...props} />
        <PropsRoute
          exact
          path="/recover-password"
          component={RecoverPassword}
          {...props}
        />
        <PropsRoute
          exact
          path="/recover-password/:token"
          component={RecoverPassword}
          {...props}
        />
        <PropsRoute
          exact
          path="/confirmationEmail/"
          component={ConfirmationEmail}
          {...props}
        />
        <PropsRoute
          path="/confirmationEmail/:token"
          exact
          component={ConfirmationEmail}
          {...props}
        />
        <PropsRoute component={NotFound} {...props} />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  userReady: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const userSub = Meteor.subscribe('user');
  const user = Meteor.user();
  const userReady = userSub.ready() && !!user;
  const loggingIn = Meteor.loggingIn();
  const loggedIn = !loggingIn && userReady;
  return {
    loggingIn,
    userReady,
    loggedIn
  };
})(App);
