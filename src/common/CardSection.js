//reuseable page section design (called 'card section') with common styling
import React from 'react';
import { View } from 'react-native';
import styles from '../Styles';

const CardSection = (props) => {
  const { cardsectionStyle } = styles;

  return (
    <View style={cardsectionStyle}>
      {props.children}
    </View>
  );
};

export { CardSection };
