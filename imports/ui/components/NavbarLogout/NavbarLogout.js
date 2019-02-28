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

  constructor(props){
    super(props);
    this.scrollToBottom.bind(this);
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  scrollToBottom() {
    $("el").scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    const { activeItem } = this.state
    const { fixed } = this.state
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
                <Menu.Item as='a' onClick={this.scrollToBottom} >Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  <AccountDropdown/>
                </Menu.Item>
            </Menu>
      </div>

    )
  }
}

export default NavBarLogout;
