import React, {PropsWithChildren} from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';

const Center: React.FC<PropsWithChildren<{color?: ColorValue}>> = ({
  children,
  color,
}) => {
  return (
    <View style={[styles.center, {backgroundColor: color}]}>{children}</View>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Center;
