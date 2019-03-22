import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react'
import './ElectionListItemParty.scss';
import { Meteor } from 'meteor/meteor';
 
class ElectionListItemParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const { election } = this.props;
    return <List.Item>
      <List.Content>
        <Icon circular name='archive' />
        {election.name}
      </List.Content>
    </List.Item>;
  }
}

export default ElectionListItemParty;
