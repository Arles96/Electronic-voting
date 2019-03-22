import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import './LeftMenu.scss';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Inicio'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleItemClick({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu className="LeftMenu" pointing secondary vertical>
        <Menu.Item
          name='Inicio'
          active={activeItem === 'Inicio'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Elecciones'
          active={activeItem === 'Elecciones'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}

export default LeftMenu;
{
   "_id" :
 "vF4mypQTte77pP3aM",
 "name" :
 "Ford",
 "members" : [
   "ru6xer4Q5qrgwfqM7" ],
 "finish_date" :
 "2019-03-31T11:01",
 "voted" : [ ],
 "status" :
 "enabled",
 "createAt" : ISODate("2019-03-17T01:42:24.249Z") }
