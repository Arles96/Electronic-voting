import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import './ShowParty.scss';
import { Icon, Modal, Table, Header, Button, Segment, Grid, Divider, Dimmer, GridRow, List } from 'semantic-ui-react'
import MemberListParty from '../MemberListParty/MemberListParty';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MemberListItem from '../MemberListItem';
import Party from '../../../api/Party/Party';
import Elections from '../../../api/Elections/Elections';
import VotationMemberParty from '../VotationMemberParty';
import VotationElectionParty from '../VotationElectionParty';
import ElectionListParty from '../ElectionListParty/ElectionListParty';

class ShowParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateMembers: false,
      active: false,
      userId: '',
      electionId: '',
      dimmerMessage: "",
      dimmerIcon: 'remove circle'
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleManage = this.handleManage.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleAddElecction = this.handleAddElection.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
    this.handleSelectElection = this.handleSelectElection.bind(this);
  }

  handleUpdate = () => this.forceUpdate;

  handleSelectMember = userId => this.setState(state => ({ userId: userId }));

  handleAddMember() {
    const data = {
      party: this.props.party,
      userId: this.state.userId
    }

    Meteor.call('addPartyMember', data, (error, result) => {
      if (error) {
        alert(error.error);
      } else {

        this.setState(state => ({ dimmerMessage: "¡Miembro agregado exitosamente!", dimmerIcon: "user plus", active: true, updateMembers: true }));
      }
    });
    window.location.reload();
  }

  handleSelectElection = electionId => this.setState(state => ({ electionId: electionId }));

  handleAddElection() {
    const data = {
      party: this.props.party,
      electionId: this.state.electionId
    }
    Meteor.call('addPartyElection', data, (error, result) => {
      if (error) {
        alert(error.error);
      } else {
        
        this.setState(state => ({ dimmerMessage: "¡Agregado a la elección exitosamente!", dimmerIcon: "address card", active: true, updateMembers: true }));
      }
    });
    window.location.reload();
  }

  handleCloseModal = () => this.setState(() => ({ active: false, open: false }));

  handleClose = () => {
    if (this.state.dimmerIcon === 'remove circle') {
      this.setState(() => ({ active: false, open: false }))
    } else {
      this.setState(() => ({ active: false, dimmerIcon: "" }))
      this.forceUpdate();
    }
  };

  handleOpen = () => this.setState(() => ({ open: true }));

  handleRemove() {
    if (confirm("¿Eliminar?")) {
      Meteor.call('removeParty', this.props.party._id, (error, result) => {
        if (error) {
          alert(error.error);
        } else {
          this.forceUpdate();
          this.setState(state => ({ dimmerMessage: "¡Elección eliminada exitosamente!", dimmerIcon: 'remove circle', active: true }));
        }
      });
    }
  }

  handleManage() {
    this.setState(state => ({ active: false }));
  }

  render() {
    const { party } = this.props;
    let createAt = new Date(party.createAt);
    let finish_date = new Date(party.finish_date);
    const { dimmerMessage, dimmerIcon, active, open, updateMembers } = this.state;

    const listMembers = Meteor.users.find({
      _id: { $in: party.members }
    }).fetch().map(member => <MemberListItem key={member._id} member={member} />);

    return <Modal
      open={open}
      closeIcon
      trigger={
        <Table.Row key={party._id} onClick={this.handleOpen} className='pointer'>
          <Table.Cell>{party.name}</Table.Cell>
          <Table.Cell>{party.motto}</Table.Cell>
        </Table.Row>
      }
      onClose={this.handleCloseModal}
    >
      <Header>
        Planilla {party.name} - <i>"{party.motto}"</i>
      </Header>
      <Modal.Content>
        <Segment placeholder textAlign={"center"} vertical>
          <Grid columns={2} relaxed='very' verticalAlign={"middle"} >
            <Grid.Column textAlign={"left"} verticalAlign='middle'>
              <Segment vertical>
                <Header as='h2'>Agregar a Elección</Header>
              </Segment>
              <Segment vertical>
                <Grid>
                  <Grid.Row>
                    <VotationElectionParty
                      handleSelectElection={this.handleSelectElection}
                      party={party} />
                    <Button secondary icon labelPosition='right' onClick={this.handleAddElecction}>
                      Agregar
                      <Icon name='hand point down outline' />
                    </Button>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment vertical><ElectionListParty party={party} /></Segment>
            </Grid.Column>
            <Grid.Column textAlign={"left"} verticalAlign='middle'>
              <Segment vertical>
                <Header as='h2'>Agregar Miembros</Header>
              </Segment>
              <Segment vertical>
                <Grid>
                  <Grid.Row>
                    <VotationMemberParty
                      handleSelectMember={this.handleSelectMember}
                      party={party} />
                    <Button secondary icon labelPosition='right' onClick={this.handleAddMember}>
                      Agregar
                      <Icon name='hand point down outline' />
                    </Button>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment vertical><MemberListParty party={party} /></Segment>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
          <Header as='h2' icon inverted>
            <Icon name={dimmerIcon} />
            {dimmerMessage}
          </Header>
        </Dimmer>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' content='Eliminar'
          onClick={this.handleRemove} />
      </Modal.Actions>
    </Modal>;
  }
}

ShowParty.propTypes = {
  electionsReady: PropTypes.bool.isRequired,
  partyReady: PropTypes.bool.isRequired
};

export default withTracker(props => {
  const partySub = Meteor.subscribe('Party.all');
  const party = Party.find();
  const partyReady = partySub.ready() && !!party;
  const electionsSub = Meteor.subscribe('Elections.all');
  const elections = Elections.find();
  const electionsReady = electionsSub.ready() && !!elections;
  return {
    user: Meteor.user(),
    electionsReady: electionsReady,
    partyReady: partyReady
  };
})(ShowParty);

