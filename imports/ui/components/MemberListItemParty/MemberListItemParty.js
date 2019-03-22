import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react'
import './MemberListItemParty.scss';
import { Meteor } from 'meteor/meteor';

class MemberListItemParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
  }
  handleRemoveMember() {
    const data = {
      party: this.props.item,
      userId: this.state.userId
    }
    Meteor.call('removeMembersParty', data, (error, result) => {
      if (error) {
        alert(error.error);
      } else {
        this.setState(state => ({ active: true }));
      }
    });
  }

  render() {
    const { member } = this.props;
    return <List.Item>
      <List.Content floated='right'>
        <Icon link name='delete' onClick={this.handleRemoveMember} />
      </List.Content>
      <List.Content>
        <Icon circular name='user circle' />
        {member.profile.firstName + ' ' + member.profile.lastName}
        <small> - Votó</small>
      </List.Content>
    </List.Item>;
  }
}

export default MemberListItemParty;
