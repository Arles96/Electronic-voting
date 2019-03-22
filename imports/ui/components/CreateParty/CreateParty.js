import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button, Form, Input, Icon, Modal, Header, Dimmer } from 'semantic-ui-react'
import './CreateParty.scss';

class CreateParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      open: false
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    Meteor.call('insertParty', {
      idCreator: Meteor.userId(),
      name: event.target.name.value,
      motto:event.target.motto.value,
      members: []
    }, (error, result) => {
      if (error) {
        alert(error.error); // TODO
      } else {
        document.getElementById('name').value = '';
        document.getElementById('motto').value = '';
        this.setState(() => ({ active: true }));
      }
    });
    window.location.reload();
  }

  handleClose = () => this.setState(() => ({ active: false, open: false }));
  handleOpen = () => this.setState(() => ({ open: true }));

  render() {
    const { active, open } = this.state;
    return <div>
      <Modal
        open={open}
        trigger={<Button onClick={this.handleOpen}>Crear planilla</Button>}
        closeIcon
        onClose={this.handleClose}
      >
        <Modal.Header>Crear planilla</Modal.Header>
        
        <Modal.Content>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                id='name'
                label='Nombre'
                name='name'
                placeholder='Nombre de la planilla...'
                required
              />
              <Form.Field
                control={Input}
                id='motto'
                label='Lema'
                name='motto'
                placeholder='Lema de la planilla...'
                required
              />
            </Form.Group>
            <Form.Field control={Button}>Crear</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>

      <Dimmer
        active={active}
        onClickOutside={this.handleClose}
        page
      >
        <Header as='h2' icon inverted>
          <Icon name='thumbs up outline' />
          ¡Planilla creada exitosamente!
            <Header.Subheader className='pointer'>Ver detalles</Header.Subheader>
        </Header>
      </Dimmer>
    </div>;
  }
}

export default CreateParty;
