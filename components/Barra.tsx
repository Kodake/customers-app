import React from 'react';
import { Button } from 'react-native-paper';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const BarraSuperior: React.FC<Props> = ({ navigation, route }) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  };

  return (
    <Button
      icon="plus-circle"
      buttonColor="#FFF"
      onPress={() => handlePress()}
    >Add</Button>
  );
};

export default BarraSuperior;
