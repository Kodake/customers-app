import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import { styles } from './InicioStyles';

interface Cliente {
  id: number;
  nombre: string;
  empresa: string;
}

interface Props {
  navigation: any;
}

const Inicio: React.FC<Props> = ({ navigation }) => {
  // URL
  const URL = 'https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes';

  // State de la APP
  const [clientes, guardarClientes] = useState<Cliente[]>([]);
  const [consultarAPI, guardarConsultarAPI] = useState<boolean>(true);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const resultado = await axios.get(URL);
        guardarClientes(resultado.data);
        guardarConsultarAPI(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (consultarAPI) {
      obtenerClientesApi();
    }
  }, [consultarAPI]);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        style={styles.boton}
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('NuevoCliente', { guardarConsultarAPI })}
      >
        Nuevo Cliente
      </Button>

      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}
      </Headline>

      <FlatList
        data={clientes}
        keyExtractor={(cliente: Cliente) => cliente.id.toString()}
        renderItem={({ item }: { item: Cliente }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => navigation.navigate('DetallesCliente', { item, guardarConsultarAPI })}
          />
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('NuevoCliente', { guardarConsultarAPI })}
      />
    </View>
  );
};

export default Inicio;
