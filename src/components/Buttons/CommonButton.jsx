import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CommonButton = props => {
  return (
    <Button fluid inverted type={props.type} color={props.color} onClick={props.onClick}>
      <Icon name={props.icon} />
      {props.name}
    </Button>
  );
};

export default CommonButton;
