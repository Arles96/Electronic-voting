import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import NavbarLogout from '../../components/NavbarLogout';
import { Grid, Image, Card, Icon, Feed} from 'semantic-ui-react';
import ListElection from '../../components/listElectionCard/listElectionCard';
import Election from '../../../api/Elections/Elections';
import Spinner from '../../components/Spinner';

import './Profile.scss';

class Profile extends React.Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      return this.props.history.push('/login');
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div id="profileHome" >
        <NavbarLogout />
        <Grid container className="profile-page">
          <Grid.Column width={6}>
              <Card>
                <Icon.Group className="icon-group-profile"  size='huge'>
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
            <Grid.Column width={10}>
              {this.props.readyElections ? <ListElection list={this.props.elections} /> : <Spinner />}
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

export default withTracker(props => {
  const readyElections = Meteor.subscribe('Elections.once');
  const elections = Election.find();
  console.log(elections);
  return {
    user: Meteor.user(),
    loggedIn: props.loggedIn,
    history: props.history,
    elections: elections,
    readyElections: readyElections.ready()
  }
})(Profile);
