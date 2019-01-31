import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Input, Form, Label, TextArea } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

import './votingForms.scss';

class addVotingForms extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.history.push('/profile');
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('Before insert');
    var data = {
      name: e.target.name.value
    }

    Meteor.call('insertVotingForm', data, function(error, result){
      if(error){
          console.log(error.reason);
          return;
      }
    })

    console.log('After insert');
  }

  render() {
    /*if (this.props.loggedIn) {
      return null;
    }*/
    return (
      <div className='votingForms-page'>
        <Navbar/>
        <h1>Voting form page</h1>
        <Form onSubmit = {this.handleSubmit.bind(this)}>
            <Form.Field>
              <Label>Nombre de la planilla</Label>
              <Input id = 'NombrePlanilla' type = 'text' name = 'name' placeholder = 'Nombre de la planilla'/>
            </Form.Field>

            <Button type = 'submit'>Crear</Button>
        </Form>
      </div>
    );
  }
}

/*addVotingForms.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};*/

export default addVotingForms;
