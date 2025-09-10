import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: boolean;
  errorText?: string;
  style?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = false,
  errorText,
  style,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={error}
      style={[styles.input, style]}
      mode="outlined"
      theme={{
        colors: {
          primary: '#1976D2',
          error: '#D32F2F',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
});

export default CustomInput;
