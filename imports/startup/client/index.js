<<<<<<< HEAD
import 'semantic-ui-css/semantic.css'
import 'react-datepicker/dist/react-datepicker.css';
=======
import 'semantic-ui-css/semantic.min.css'
>>>>>>> cae8e334be8a2cb5cd6d31b94bc4026e825083d0
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

// import client routes
import App from './routes';

// mount app
Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
