//reuseable page design (called 'card') with common styling
import React from 'react';
import { View } from 'react-native';
import styles from '../Styles';

const Card = (props) => {
  const { cardStyle } = styles;

  return (
    <View style={cardStyle}>
      {props.children}
    </View>
  );
};

export { Card };
