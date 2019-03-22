import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Icon, Container, Header, Grid } from 'semantic-ui-react'
import Party from '../../../api/Party/Party';
import CreateParty from '../../components/CreateParty/CreateParty';
import PartyTable from '../../components/PartyTable/PartyTable';
import { withTracker } from 'meteor/react-meteor-data';
import './PartyPage.scss';
import NavbarLogout from '../../components/NavbarLogout';
import Spinner from '../../components/Spinner';
import LeftMenuProfile from '../../components/leftMenuProfile/leftMenuProfile';
import Elections from '../../../api/Elections/Elections';

class PartyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      tablePage: 0,
      party: props.party,
      partyCount: props.partyCount
    };
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
    const { elections } = this.props;
    return <div id="profileHome" >
      <NavbarLogout />
      <Grid container className="profile-page">
        <Grid.Column width={6}>
          <LeftMenuProfile user={Meteor.user()} length={elections.fetch().length} />
        </Grid.Column>
        <Grid.Column width={10}>
          {this.props.readyElections ?
            <div style={{ paddingRight: 2 + "rem" }}>
              <Container>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='address card' circular />
                  <Header.Content>Planillas</Header.Content>
                </Header>
                <CreateParty />
                <PartyTable
                  party={this.props.party}
                  partyCount={this.props.partyCount}
                  limit={limit}
                  tablePage={tablePage}
                  handlePlusTablePage={this.handlePlusTablePage}
                  handleMinusTablePage={this.handleMinusTablePage}
                />
              </Container>
            </div >
            : <Spinner />}
        </Grid.Column>
      </Grid>
    </div >
      ;
  }
}

export default withTracker(props => {
  const readyParties = Meteor.subscribe('Party.all');
  const party = Party.find();
  const partyCount = party.count();
  const readyElections = Meteor.subscribe('Elections.once');
  const elections = Elections.find();
  return {
    elections: elections,
    readyElections: readyElections.ready(),
    party: party,
    partyCount: partyCount
  }
})(PartyPage);
