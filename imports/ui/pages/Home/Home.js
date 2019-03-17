import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid, Card } from 'semantic-ui-react'
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div>
      <Card.Group itemsPerRow={4} className='Home-CardGroup'>
        <Card color='red'>
          <Card.Content>
            <h1>Card</h1>
          </Card.Content>
        </Card>
        <Card color='red'>
          <Card.Content>
            <h1>Card</h1>
          </Card.Content>
        </Card>
        <Card color='red'>
          <Card.Content>
            <h1>Card</h1>
          </Card.Content>
        </Card>
        <Card color='red'>
          <Card.Content>
            <h1>Card</h1>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>;
  }
}

export default Home;
