import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import {
  Button,
  Container,
  Menu
} from 'semantic-ui-react'
import $ from 'jquery'
class NavBarLogout extends Component {

  constructor(props) {
    super(props);
    this.scrollToBottom.bind(this);
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  scrollToBottom() {
    $("el").scrollIntoView({ behavior: 'smooth' });
  }
  enviar(){
    const tiempo = new Date();
    tiempo.setDate(tiempo.getDate()+1);
    const data = {
      creationtime: new Date(),
      activo: true,
      dyingtime: tiempo,
    }
    Meteor.call('ConfirmationEmail',data);
  }
  render() {
    const { activeItem } = this.state;
    const { fixed } = this.state;

    return (
      <div>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              id="HomepageHeading"
            >
                <Menu.Item
                  as={Link} to='/'
                  name='Página Principal'
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  active
                >Home</Menu.Item>
                <Menu.Item position='right'>
                  <AccountDropdown {...this.props}/>
                </Menu.Item>
            </Menu>
      </div>
    );
  }
}

export default NavBarLogout;
