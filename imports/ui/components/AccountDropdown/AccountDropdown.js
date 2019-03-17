import { Dropdown, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AccountDropdown extends Component {
    render() {
        const trigger = (
            <span>
             Hola mundo
            </span>
          )

          const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
          ]
        return (
            <Dropdown trigger={trigger} options={options} pointing='top left' icon='user circle' />
        );
    }
  }

export default AccountDropdown;