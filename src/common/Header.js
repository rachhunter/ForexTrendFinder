//reuseable header design with common styling

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles';

const Header = ({ children }) => {
  const { headerUserDetailsText, headerSectionStyle } = styles;

  return (
    <View style={headerSectionStyle}>
        <Text style={headerUserDetailsText}>
          {children}
        </Text>
    </View>
  );
};

export { Header };
