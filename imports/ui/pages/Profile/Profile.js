import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Card, Icon, Feed, Icon} from 'semantic-ui-react';


import './Profile.scss';

class Profile extends React.Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      return this.props.history.push('/login');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      nextProps.history.push('/login');
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="profile-page">
       <div class="ui secondary pointing menu">
        <a class="item">
          Home
        </a>
        <a class="item">
          Messages
        </a>
        <a class="item">
          Friends
         </a>
       <div class="right menu">
          <a class="ui item active">
             Logout
          </a>
         </div>
          </div>
         <div class="ui segment">
          <p></p>
        </div>
        <Grid>
          <Grid.Column width={5}>
              <Card>
                <Icon.Group size='huge'>
                  <Icon size='big' name='circle outline' />
                  <Icon name='user' />
                </Icon.Group>
                <Card.Content>
                  <Card.Header>Ramiro</Card.Header>
                  <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>Matthew is a musician living in Seattle.</Card.Description>
                    <div>
                     <Icon name='briefcase' size='tiny' /> <h1> "Carrera"  </h1>
                   </div>
                   <div>
                     <Icon name='envelope' size='tiny' /> <h1> "Correo"  </h1>
                   </div>
                   <div>
                     <Icon name='mobile alternate' size='tiny' /> <h1> "Celular"  </h1>
                   </div>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>

               <Card>
                <Card.Content>
                  <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image='/images/avatar/small/jenny.jpg' />
                      <Feed.Content>
                        <Feed.Date content='1 day ago' />
                        <Feed.Summary>
                          You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='/images/avatar/small/molly.png' />
                      <Feed.Content>
                        <Feed.Date content='3 days ago' />
                        <Feed.Summary>
                          You added <a>Molly Malone</a> as a friend.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='/images/avatar/small/elliot.jpg' />
                      <Feed.Content>
                        <Feed.Date content='4 days ago' />
                        <Feed.Summary>
                          You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>

            </Grid.Column>
            <Grid.Column width={11}>
            <h1> "Bienvenido usuario ;)"  </h1> 
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}


Profile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
/*
export default withTracker(() => {
  // counters example
  return undefined;
})(Profile); */

export default Profile;
