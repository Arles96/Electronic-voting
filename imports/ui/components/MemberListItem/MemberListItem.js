import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react'
import './MemberListItem.scss';
import { Meteor } from 'meteor/meteor';
 
class MemberListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
  }
  handleRemoveMember() {
    const data = {
      election: this.props.item,
      userId: this.state.userId
    }
    Meteor.call('removeElectionMember', data, (error, result) => {
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

export default MemberListItem;
