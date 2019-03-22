import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Icon, Container, Header } from 'semantic-ui-react'
import Party from '../../../api/Party/Party';
import CreateParty from '../../components/CreateParty/CreateParty';
import PartyTable from '../../components/PartyTable/PartyTable';
import {withTracker} from 'meteor/react-meteor-data';
import './PartyPage.scss';

class PartyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      tablePage: 0,
      party: props.party,
      partyCount: props.partyCount
    };
    console.log(Party.find().count())
    this.handlePlusTablePage = this.handlePlusTablePage.bind(this);
    this.handleMinusTablePage = this.handleMinusTablePage.bind(this);
  }
  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('Party.all');
      const query = this.state.party;
      if (query) {
        this.setState(state => ({
          Party: query
        }))
      }
    });
  }

  handlePlusTablePage = () => this.setState(state => ({ tablePage: state.tablePage + 1 }));
  handleMinusTablePage = () => this.setState(state => ({ tablePage: state.tablePage - 1 }));

  render() {
    const { limit, tablePage } = this.state;
    return <div style={{ paddingRight: 2 + "rem" }}>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='archive' circular />
          <Header.Content>Planillas</Header.Content>
        </Header>
        <CreateParty />
        <PartyTable
          party = {this.props.party}
          partyCount={this.props.partyCount}
          limit={limit}
          tablePage={tablePage}
          handlePlusTablePage={this.handlePlusTablePage}
          handleMinusTablePage={this.handleMinusTablePage}
        />
      </Container>
    </div >;
  }
}

export default withTracker(props=>{
  const readyParties = Meteor.subscribe('Party.all');
  const party = Party.find({});
  const partyCount = Party.find({}).count();

  return {
    party: party,
    partyCount: partyCount
  }
})(PartyPage);
