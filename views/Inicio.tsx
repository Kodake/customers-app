import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from './InicioStyles';
import { observer } from 'mobx-react';
import store from '../store/sharedStateStore';

interface Cliente {
  id: number;
  nombre: string;
  empresa: string;
}

interface Props {
  navigation: any;
}

const Inicio: React.FC<Props> = observer(({ navigation }) => {

  useEffect(() => {
    store.fetchClientes();
  }, []);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        style={styles.boton}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('NuevoCliente')}
      >
        Nuevo Cliente
      </Button>

      <Headline style={globalStyles.titulo}>
        {store.clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}
      </Headline>

      <FlatList
        data={store.clientes}
        keyExtractor={(cliente: Cliente) => cliente.id.toString()}
        renderItem={({ item }: { item: Cliente }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => {}}
          />
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
});

export default Inicio;
