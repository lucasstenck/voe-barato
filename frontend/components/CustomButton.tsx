import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  mode = 'contained',
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
