import React, { Component } from 'react';
import { Button, Form, Input, Icon, Modal, Header, Dimmer } from 'semantic-ui-react'
import './CreatePolling.scss';
import { Meteor } from 'meteor/meteor';

class CreatePolling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if (new Date() > new Date(event.target.finish_date.value)) {
      alert('Fecha inválida');
      return 0;
    }
    Meteor.call('insertPolling', {
      idCreator: Meteor.userId(),
      name: event.target.name.value,
      members: [],
      finish_date: event.target.finish_date.value,
      voted: [],
      status: 'enabled'
    }, (error, result) => {
      if (error) {
        alert(error.error);
      } else {
        document.getElementById('finish_date').value = '';
        document.getElementById('name').value = '';
        this.setState(state => ({ active: true }));
      }
    });
  }
  handleClose = () => this.setState(state => ({ active: false }));

  render() {
    return <div>
      <Modal open={this.state.open} trigger={<Button>Crear votación</Button>} closeIcon>
        <Modal.Header>Crear votación</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Group widths='equal'>
              <Form.Field control={Input} id='name' label='Nombre' name='name' placeholder='Nombre de votación...' required />
              <Form.Field control={Input} id='finish_date' type='datetime-local' label='Fecha de clausura' name='finish_date' required />
            </Form.Group>
            <Form.Field control={Button}>Crear</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
      <Dimmer active={this.state.active} onClickOutside={this.handleClose} page>
        <Header as='h2' icon inverted>
          <Icon name='thumbs up outline' />
          ¡Votación creada exitosamente!
            <Header.Subheader className='pointer'>Ver detalles</Header.Subheader>
        </Header>
      </Dimmer>
    </div>;
  }
}

export default CreatePolling;
