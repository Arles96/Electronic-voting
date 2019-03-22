import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react'
import './ElectionListParty.scss';
import { Meteor } from 'meteor/meteor';
import ElectionListItemParty from '../ElectionListItemParty';
import Elections from '../../../api/Elections/Elections';

class ElectionListParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const listElections = Elections.find({ 
      _id: { $in: this.props.party.elections }
    }).fetch().map(election => <ElectionListItemParty key={election._id} election={election} />);

    return <List className='ElectionListParty' items={listElections}></List>;
  }
}

export default ElectionListParty;