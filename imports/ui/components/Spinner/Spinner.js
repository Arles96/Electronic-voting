import React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import './Spinner.scss';

const Spinner = () => (
  <Segment className="login-spinner" >
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
    <Image src='/short-paragraph.png' />
  </Segment>
);

export default Spinner;
