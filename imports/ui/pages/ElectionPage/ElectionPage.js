import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Icon, Container, Header } from 'semantic-ui-react'
import Elections from '../../../api/Elections/Elections';
import CreateElection from '../../components/CreateElection/CreateElection';
import ElectionTable from '../../components/ElectionTable/ElectionTable';
import ShowElection from '../../components/ShowElection/ShowElection';
import './ElectionPage.scss';

class ElectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      tablePage: 0,
      electionCount: this.props.elections.find().count()
    };
    this.handlePlusTablePage = this.handlePlusTablePage.bind(this);
    this.handleMinusTablePage = this.handleMinusTablePage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
 
  handleUpdate = () => this.forceUpdate();

  handlePlusTablePage = () => {
    this.setState(state => ({ tablePage: state.tablePage + 1 }))
  };
  handleMinusTablePage = () => this.setState(state => ({ tablePage: state.tablePage - 1 }));

  render() {
    const { electionCount, limit, tablePage } = this.state;

    const listElections = this.props.elections.find({}, {
      sort: { createAt: -1 },
      skip: tablePage * limit,
      limit: limit
    }).fetch().map(election => <ShowElection key={election._id} election={election} />)

    return <div style={{ paddingRight: 2 + "rem" }}>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='archive' circular />
          <Header.Content>Elecciones</Header.Content>
        </Header>
        <CreateElection
          handleUpdate={this.handleUpdate}
          />
        <ElectionTable
          handleUpdate={this.handleUpdate}
          listElections={listElections}
          electionCount={electionCount}
          limit={limit}
          tablePage={tablePage}
          handlePlusTablePage={this.handlePlusTablePage}
          handleMinusTablePage={this.handleMinusTablePage}
        />
      </Container>
    </div >;
  }
}

ElectionPage.propTypes = {
  electionsReady: PropTypes.bool.isRequired
};

export default withTracker(props => {
  const electionsSub = Meteor.subscribe('Elections.all');
  const electionsReady = electionsSub.ready() && !!Elections;
  return {
    elections: Elections,
    user: Meteor.user(),
    electionsReady: electionsReady
  };
})(ElectionPage);

