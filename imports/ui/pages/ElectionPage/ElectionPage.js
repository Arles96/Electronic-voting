import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Icon, Container, Header } from 'semantic-ui-react'
import Elections from '../../../api/Elections/Elections';
import CreateElection from '../../components/CreateElection/CreateElection';
import ElectionTable from '../../components/ElectionTable/ElectionTable';
import './ElectionPage.scss';

class ElectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      tablePage: 0,
      electionCount: Elections.find().count()
    };
    this.handlePlusTablePage = this.handlePlusTablePage.bind(this);
    this.handleMinusTablePage = this.handleMinusTablePage.bind(this);
  }
  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('Elections.all');
      const query = Elections.find();
      if (query) {
        this.setState(state => ({
          Elections: query
        }))
      }
    });
  }

  handlePlusTablePage = () => this.setState(state => ({ tablePage: state.tablePage + 1 }));
  handleMinusTablePage = () => this.setState(state => ({ tablePage: state.tablePage - 1 }));

  render() {
    const { electionCount, limit, tablePage } = this.state;

    return <div style={{ paddingRight: 2 + "rem" }}>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='archive' circular />
          <Header.Content>Elecciones</Header.Content>
        </Header>
        <CreateElection />
        <ElectionTable
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

export default ElectionPage;
