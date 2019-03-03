import React, { Component } from 'react';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import './CreatePolling.scss';
import { Meteor } from 'meteor/meteor';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class CreatePolling extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    Meteor.call('insertPolling', { name: event.target.pollingName.value }, (error, result) => {

    });
  }

  render() {
    return <Form onSubmit={this.handleOnSubmit}>
      <h1>Crear nueva votación</h1>
      <Form.Group widths='equal'>
        <Form.Field control={Input} label='Nombre' name="pollingName" placeholder='Nombre de votación...' required />
      </Form.Group>
      <Form.Field control={Button}></Form.Field>
    </Form>;
  }
}

export default CreatePolling;

/*
idCreator: data.creator, //  Creator Id
name: data.name, // Name
members: data.members, // User list
creation_date: data.creation_date, // Creation date
finish_date: data.finish_date, // Finish date
voted: data.voted, // Members who already voted
no_voted: data.no_voted, // Members who have not voted
status: data.status, // Votation status
Ats: () => new Date() // Votation Ats
*/
