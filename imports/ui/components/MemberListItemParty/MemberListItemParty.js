import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react'
import './MemberListItemParty.scss';
import { Meteor } from 'meteor/meteor';
 
class MemberListItemParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const { member } = this.props;
    return <List.Item>
      <List.Content>
        <Icon circular name='user circle' />
        {member.profile.firstName + ' ' + member.profile.lastName}
      </List.Content>
    </List.Item>;
  }
}

export default MemberListItemParty;
