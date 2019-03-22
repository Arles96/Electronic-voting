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
      { key: 'user', text: 'Perfil', icon: 'user', onClick: () => this.redirect('/profile')},
      { key: 'settings', text: 'Settings', icon: 'settings', onClick: () => this.redirect('/updateinfouser') },
      { hey: 'dashboard', text: 'Elecciones', icon: 'archive', onClick: () => this.redirect('/dashboard') },
      { hey: 'planillas', text: 'Planillas', icon: 'address card', onClick: () => this.redirect('/elections') },
      { key: 'sign-out', text: 'Cerrar sesión', icon: 'sign out', onClick: () => this.logout() },
    ]
    return (
      <Dropdown trigger={trigger} options={options} pointing='top left' icon='user circle' />
    );
  }
}

export default AccountDropdown;