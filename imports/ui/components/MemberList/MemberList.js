import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react'
import './MemberList.scss';
import { Meteor } from 'meteor/meteor';
import MemberListItem from '../MemberListItem';

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMembers: Meteor.users.find({
        _id: { $in: this.props.election.members }
      }).fetch().map(member => <MemberListItem key={member._id} member={member} />)
    };
  }

  render() {
    const { listMembers } = this.state;
    return <List className='MemberList' items={listMembers}></List>;
  }
}

export default MemberList;
