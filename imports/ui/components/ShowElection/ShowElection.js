import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import './ShowElection.scss';
import { Icon, Modal, Table, Header, Button, Segment, Grid, Divider, Dimmer, GridRow, List } from 'semantic-ui-react'
import VotationMember from '../VotationMember';
import Elections from '../../../api/Elections/Elections';
import MemberListItem from '../MemberListItem';

class ShowElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateMembers: false,
      active: false,
      userId: '',
      dimmerMessage: "",
      dimmerIcon: 'remove circle'
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleManage = this.handleManage.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
  }

  handleUpdate = () => this.forceUpdate;

  handleSelectMember = userId => this.setState(state => ({ userId: userId }));

  handleAddMember() {
    const data = {
      election: this.props.election,
      userId: this.state.userId
    }
    Meteor.call('addElectionMember', data, (error, result) => {
      if (error) {
        alert(error.error);
      } else {
        
        this.setState(state => ({ dimmerMessage: "¡Miembro agregado exitosamente!", dimmerIcon: "user plus", active: true, updateMembers: true }));
      }
    });
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
      Meteor.call('removeElection', this.props.election._id, (error, result) => {
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
    const { election } = this.props;
    let createAt = new Date(election.createAt);
    let finish_date = new Date(election.finish_date);
    const { dimmerMessage, dimmerIcon, active, open, updateMembers } = this.state;

    const listMembers = Meteor.users.find({
      _id: { $in: election.members }
    }).fetch().map(member => <MemberListItem key={member._id} member={member} />);

    return <Modal
      open={open}
      closeIcon
      trigger={
        <Table.Row key={election._id} onClick={this.handleOpen} className='pointer'>
          <Table.Cell>{election.name}</Table.Cell>
          <Table.Cell>{election.status === 'enabled' ? 'Abierto' : 'Cerrado'}</Table.Cell>
          <Table.Cell>
            {finish_date.getDate() + "/" + (finish_date.getMonth() + 1) + "/" + finish_date.getFullYear() + ", " + finish_date.getHours() + ":" + finish_date.getMinutes()}
          </Table.Cell>
        </Table.Row>
      }
      onClose={this.handleCloseModal}
    >
      <Header>
        Elección {election.name}
      </Header>
      <Modal.Content>
        <Segment placeholder textAlign={"center"} vertical>
          <Grid columns={2} relaxed='very' verticalAlign={"middle"} >
            <Grid.Column textAlign={"center"} >
              <Header as='h2'>{"Estado: "}{election.status === 'enabled' ? 'Abierto' : 'Cerrado'}</Header>
              <p>{"Creación: "}
                {createAt.getDate() + "/" + (createAt.getMonth() + 1) + "/" + createAt.getFullYear() + ", " + createAt.getHours() + ":" + createAt.getMinutes()}
              </p>
              <p>{"Clausura: "}
                {finish_date.getDate() + "/" + (finish_date.getMonth() + 1) + "/" + finish_date.getFullYear() + ", " + finish_date.getHours() + ":" + finish_date.getMinutes()}
              </p>
            </Grid.Column>
            <Grid.Column textAlign={"left"} verticalAlign='middle'>
              <Segment vertical>
                <Grid>
                  <Grid.Row>
                    <VotationMember
                      handleSelectMember={this.handleSelectMember}
                      election={election} />
                    <Button secondary icon labelPosition='right' onClick={this.handleAddMember}>
                      Agregar
                      <Icon name='hand point down outline' />
                    </Button>
                  </Grid.Row>
                </Grid>
              </Segment>
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
        <Button content='Administrar'
          onClick={this.handleManage} />
        <Button color='red' content='Eliminar'
          onClick={this.handleRemove} />
      </Modal.Actions>
    </Modal>;
  }
}

ShowElection.propTypes = {
  electionsReady: PropTypes.bool.isRequired
};

export default withTracker(props => {
  const electionsSub = Meteor.subscribe('Elections.all');
  const elections = Elections.find();
  const electionsReady = electionsSub.ready() && !!elections;
  return {
    user: Meteor.user(),
    electionsReady: electionsReady
  };
})(ShowElection);

