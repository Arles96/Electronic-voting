import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

import './Landing.scss';

class Landing extends React.Component {
  componentWillMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/profile');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.history.push('/profile');
      return false;
    }
    return true;
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }
    return (
      <div className="landing-page">
        <Navbar/>
        <h1>Landing Page</h1>
      </div>
    );
  }
}

Landing.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Landing;
