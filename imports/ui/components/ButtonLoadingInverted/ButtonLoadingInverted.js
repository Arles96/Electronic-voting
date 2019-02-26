import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonLoadingInverted = ({ loading, text, className, color }) => {
  if (loading === true) {
    return (
      <Button className={className} loading inverted color={color} >
        {text}
      </Button>
    );
  } else {
    return (
      <Button className={className} inverted color={color} >
        {text}
      </Button>
    );
  }
}

export default ButtonLoadingInverted;