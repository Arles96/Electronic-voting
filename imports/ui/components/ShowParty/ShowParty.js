import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import './ShowParty.scss';
import { Icon, Modal, Table, Header, Button, Segment, Grid, Divider, Dimmer, GridRow } from 'semantic-ui-react'
import VotationMember from '../VotationMember';
import MemberListParty from '../MemberListParty/MemberListParty';

class ShowParty extends Component {
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
      party: this.props.party,
      userId: this.state.userId
    }
    Meteor.call('addMembersParty', data, (error, result) => {
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
      Meteor.call('removeParty', this.props.election._id, (error, result) => {
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
    const { party } = this.props;

    return <Modal closeIcon
      trigger={
        <Table.Row key={party._id} className='pointer'>
          <Table.Cell>{party.name}</Table.Cell>
          <Table.Cell>{party.motto}</Table.Cell>
          {/*<Table.Cell>{party.photo}</Table.Cell>*/}
        </Table.Row>
      }
    >
      <Header>
        Planilla {party.name}
      </Header>
      <Modal.Content>
        <Segment placeholder textAlign={"center"} vertical>
          <Grid columns={2} relaxed='very' verticalAlign={"middle"} >
            <Grid.Column textAlign={"left"} verticalAlign='middle'>
              <Segment vertical>
                <Grid>
                  <Grid.Row>
                    <VotationMember handleSelectMember={this.handleSelectMember} party={party} />
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
        <Dimmer active={this.state.active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon inverted>
            <Icon name='remove circle' />
            ¡Planilla eliminada exitosamente!
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

export default ShowParty;
