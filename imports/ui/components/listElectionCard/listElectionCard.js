import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Image } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import './listElectionCard.scss';

const SingleCardElection = ({ name, finish_date, description, _id }) => {
  const sendEmail = (id) => {
    const data = {
      electionid: id
    };
    Meteor.call('insertEmailVerification', data, error => {
      if (!error) {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Se ha enviado la verificación'
        })
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Ya sea ha enviado el correo de verificación'
        })
      }
    });
  };
  return (
    <Card className="card-election" >
      <Card.Content>
        <Image floated='right' size='mini' src='/descarga.png' />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Fecha limite {finish_date}</Card.Meta>
        <Card.Description>
          {description ? description : "Participa en nuestra elección"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button onClick={() => sendEmail(_id)} basic color='green'>
            Votar
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
};

export default listCard = ({ list }) => (
  <Card.Group className="list-election" >
    {list.map(doc => (
      <SingleCardElection key={doc._id} {...doc} />
    ))}
  </Card.Group>
);