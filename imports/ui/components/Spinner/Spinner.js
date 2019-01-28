import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import './Spinner.scss';

const Spinner = () => (
  <Segment>
    <Dimmer active>
      <Loader content='Loading' />
    </Dimmer>
  </Segment>
);

export default Spinner;
