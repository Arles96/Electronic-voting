import { Accounts } from 'meteor/accounts-base';
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
    Accounts.logout();
    window.location.href = '/';
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