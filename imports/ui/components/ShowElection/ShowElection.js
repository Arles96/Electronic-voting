import React, { Component } from 'react';
import { Icon, Modal, Table, Header, Button, Segment, Grid, Divider, Dimmer } from 'semantic-ui-react'
import './ShowElection.scss';
import { Meteor } from 'meteor/meteor';
import VotationMember from '../VotationMember';

class ShowElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleManage = this.handleManage.bind(this);
  }

  handleClose() {
    this.setState(state => ({ active: false }));
    this.props.update();
  };

  handleRemove() {
    if (confirm("¿Eliminar?")) {
      Meteor.call('removeElection', this.props.item._id, (error, result) => {
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
    const { item } = this.props;
    let createAt = new Date(item.createAt);
    let finish_date = new Date(item.finish_date);

    return <Modal closeIcon
      trigger={
        <Table.Row key={item._id} className='pointer'>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.status === 'enabled' ? 'Abierto' : 'Cerrado'}</Table.Cell>
          <Table.Cell>
            {finish_date.getDate() + "/" + (finish_date.getMonth() + 1) + "/" + finish_date.getFullYear() + ", " + finish_date.getHours() + ":" + finish_date.getMinutes()}
          </Table.Cell>
        </Table.Row>
      }
    >
      <Header>
        Elección {item.name}
      </Header>
      <Modal.Content>
        <Segment placeholder textAlign={"center"} vertical>
          <Grid columns={2} relaxed='very' textAlign={"center"} verticalAlign={"middle"} >
            <Grid.Column>
              <Header as='h2'>{"Estado: "}{item.status === 'enabled' ? 'Abierto' : 'Cerrado'}</Header>
              <p>{"Creación: "}
                {createAt.getDate() + "/" + (createAt.getMonth() + 1) + "/" + createAt.getFullYear() + ", " + createAt.getHours() + ":" + createAt.getMinutes()}
              </p>
              <p>{"Clausura: "}
                {finish_date.getDate() + "/" + (finish_date.getMonth() + 1) + "/" + finish_date.getFullYear() + ", " + finish_date.getHours() + ":" + finish_date.getMinutes()}
              </p>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <VotationMember item={item}/>
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
