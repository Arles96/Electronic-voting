import { Meteor } from 'meteor/meteor';
import { Dropdown, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AccountDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }

  logout() {
    Meteor.logout((err) => {
      if (err) {
        console.log(err.reason);
      } else {
        this.props.history.push('/');
      }
    });
  }
  render() {
    const trigger = (
      <span>
        Hola mundo
      </span>
    )

    const options = [
      { key: 'user', text: 'Account', icon: 'user' },
      { key: 'settings', text: 'Settings', icon: 'settings' },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => this.logout() },
    ]
    return (
      <Dropdown trigger={trigger} options={options} pointing='top left' icon='user circle' />
    );
  }
}

export default AccountDropdown;