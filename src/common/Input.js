//reuseable user input design with common styling
import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../Styles';

const Input = ({
  placeholder,
  maxLength,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  returnKeyType
}) => {
  const { inputStyle, inputContainerStyle } = styles;
  return (
    <View style={inputContainerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        placeholderTextColor={'#657b86'}
        maxLength={maxLength}
        autoCorrect={false}
        autoCapitalize='none'
        onChangeText={onChangeText}
        style={inputStyle}
        value={value}
      />
  </View>
  );
};

export { Input };
