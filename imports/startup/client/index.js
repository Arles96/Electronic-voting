import 'semantic-ui-css/semantic.min.css'
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

// import client routes
import App from './routes';

// mount app
Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
