import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react'
import './MemberListParty.scss';
import { Meteor } from 'meteor/meteor';
import MemberListItemParty from '../MemberListItem';

class MemberListParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMembers: Meteor.users.find({
        _id: { $in: this.props.party.members }
      }).fetch().map(member => <MemberListItemParty key={member._id} member={member} />)
    };
  }

  render() {
    const { listMembers } = this.state;
    return <List className='MemberListParty' items={listMembers}></List>;
  }
}

export default MemberListParty;
