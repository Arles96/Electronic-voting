import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link} to='/'
            name='Página Principal'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Iniciar Sesión'
            as={Link}
            to='/login'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/signup'
            name='Registrarse'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    )
  }
}

export default NavBar;
