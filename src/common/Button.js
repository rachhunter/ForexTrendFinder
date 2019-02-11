//reuseable button design with common styling
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../Styles';

const Button = ({ onPress, children }) => {
  const { buttonStyle, ButtonTextStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={ButtonTextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
