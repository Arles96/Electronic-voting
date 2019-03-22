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

  redirect (url) {
    window.location.href = url;
  }

  render() {
    const trigger = (
      <span>
        Opciones
      </span>
    )

    const options = [
      { key: 'user', text: 'Account', icon: 'user' },
      { hey: 'dashboard', text: 'dashboard', icon: 'dashboard', onClick: () => this.redirect('/dashboard') },
      { key: 'settings', text: 'Settings', icon: 'settings', onClick: () => this.redirect('/updateinfouser') },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => this.logout() },
    ]
    return (
      <Dropdown trigger={trigger} options={options} pointing='top left' icon='user circle' />
    );
  }
}

export default AccountDropdown;