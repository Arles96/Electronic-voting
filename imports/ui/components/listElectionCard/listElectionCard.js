import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

import './listElectionCard.scss'

const SingleCardElection = ({ name, finish_date, description }) => (
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
        <Button basic color='green'>
          Aceptar
        </Button>
        <Button basic color='red'>
          Denegar
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default listCard = ({ list }) => (
  <Card.Group className="list-election" >
    {list.map(doc => (
      <SingleCardElection key={doc._id} {...doc} />
    ))}
  </Card.Group>
);