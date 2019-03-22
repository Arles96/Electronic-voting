import React from 'react';
import { Card, Icon, Feed } from 'semantic-ui-react';

const LeftMenuProfile = ({ user, length }) => (
  <div>
    <Card>
      <Icon.Group className="icon-group-profile" size='huge'>
        <Icon name='user' />
      </Icon.Group>
      <Card.Content>
        <Card.Header>
          {user && user.profile.firstName} {user && user.profile.lastName}
        </Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2015</span>
        </Card.Meta>
        <Card.Description>Matthew is a musician living in Seattle.</Card.Description>
        <div className="item-profile" >
          <Icon name='university' size='large' /> {user && user.profile.campus}
        </div>
        <div className="item-profile" >
          <Icon name='envelope' size='large' /> {user && user.emails[0].address}
        </div>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          {length} Elecciones
        </a>
      </Card.Content>
    </Card>

    <Card>
      <Icon.Group className="icon-group-profile" size='huge'>
        <Icon name='settings' />
      </Icon.Group>
      <Card.Content>
        <a href="/profile">
          <Icon name='user' />
          Perfil
          </a>
      </Card.Content>
      <Card.Content>
        <a href="/dashboard">
          Elecciones
          </a>
      </Card.Content>
    </Card>

  </div>
);

export default LeftMenuProfile;
