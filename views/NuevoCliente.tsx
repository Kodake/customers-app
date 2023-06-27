import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

interface Props {
  navigation: any;
  route: any;
}

const NuevoCliente: React.FC<Props> = ({ navigation, route }) => {
  let titulo: string;
  const { guardarConsultarAPI } = route.params;

  if (guardarConsultarAPI == null) {
    navigation.navigate('NuevoCliente');
  }

  // campos del formulario
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const { nombre, telefono, correo, empresa } = route.params.cliente;
      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    // validar
    console.log(nombre, telefono, correo, empresa);
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }

    // generar el cliente
    const cliente = { nombre, telefono, correo, empresa };

    if (route.params.cliente) {
      titulo = 'Actualizar Cliente';
      const { id } = route.params.cliente;
      const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes/${id}`;

      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      // guardar
      titulo = 'Añadir Nuevo Cliente';
      try {
        await axios.post(
          'https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes',
          cliente
        );
      } catch (error) {
        console.log(error);
      }
    }

    // redireccionar
    navigation.navigate('Inicio');
    // limpiar formulario (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    // Cambiar a true para traernos el nuevo cliente
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Escribe tu Nombre"
        onChangeText={(texto) => guardarNombre(texto)}
        value={nombre}
        style={styles.input}
      />

      <TextInput
        label="Telefono"
        placeholder="9999999999"
        onChangeText={(texto) => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />

      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={(texto) => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder="Escribe el Nombre de tu Empresa"
        onChangeText={(texto) => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={() => guardarCliente()}
      >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son Obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NuevoCliente;
