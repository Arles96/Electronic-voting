import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import './ShowElection.scss';
import { Icon, Modal, Table, Header, Button, Segment, Grid, Divider, Dimmer, GridRow } from 'semantic-ui-react'
import VotationMember from '../VotationMember';
import MemberList from '../MemberList/MemberList';

class ShowElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      userId: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleManage = this.handleManage.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
  }

  handleSelectMember= userId => this.setState(state => ({ userId: userId }));


  handleAddMember() {
    const data = {
      election: this.props.election,
      userId: this.state.userId
    }
    Meteor.call('addMembersElection', data, (error, result) => {
      if (error) {
        alert(error.error);
      } else {
        this.setState(state => ({ active: true }));
      }
    });
  }

  handleClose() {
    this.setState(state => ({ active: false }));
  };

  handleRemove() {
    if (confirm("¿Eliminar?")) {
      Meteor.call('removeElection', this.props.election._id, (error, result) => {
        if (error) {
          alert(error.error);
        } else {
          this.setState(state => ({ active: true }));
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

    return <Modal closeIcon
      trigger={
        <Table.Row key={election._id} className='pointer'>
          <Table.Cell>{election.name}</Table.Cell>
          <Table.Cell>{election.status === 'enabled' ? 'Abierto' : 'Cerrado'}</Table.Cell>
          <Table.Cell>
            {finish_date.getDate() + "/" + (finish_date.getMonth() + 1) + "/" + finish_date.getFullYear() + ", " + finish_date.getHours() + ":" + finish_date.getMinutes()}
          </Table.Cell>
        </Table.Row>
      }
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
                    <VotationMember handleSelectMember={this.handleSelectMember} election={election} />
                    <Button secondary icon labelPosition='right' onClick={this.handleAddMember}>
                      Agregar
                      <Icon name='hand point down outline' />
                    </Button>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment vertical><MemberList election={election} /></Segment>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
        <Dimmer active={this.state.active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon inverted>
            <Icon name='remove circle' />
            ¡Elección eliminada exitosamente!
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

export default ShowElection;
