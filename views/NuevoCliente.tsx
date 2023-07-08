import React from 'react';
import { View } from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import globalStyles from '../styles/global';
import { styles } from './NuevoClienteStyles';
import store from '../store/sharedStateStore';
import { observer } from 'mobx-react';

interface Props {
  navigation: any;
  route: any;
}

const NuevoCliente: React.FC<Props> = observer(({ navigation }) => {

  const handleSaveCliente = async () => {
    await store.saveCliente();
    if (store.isSaved) {
      store.clearCliente();
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Escribe tu Nombre"
        onChangeText={(texto) => store.setNombre(texto)}
        style={styles.input}
      />

      <TextInput
        label="Telefono"
        placeholder="9999999999"
        onChangeText={(texto) => store.setTelefono(texto)}
        style={styles.input}
      />

      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={(texto) => store.setCorreo(texto)}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder="Escribe el Nombre de tu Empresa"
        onChangeText={(texto) => store.setEmpresa(texto)}
        style={styles.input}
      />

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={handleSaveCliente}
      >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={store.alerta} onDismiss={() => store.setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => store.setAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
});

export default NuevoCliente;
