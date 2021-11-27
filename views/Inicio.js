import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Headline, Button, FAB, Card, Paragraph } from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const Inicio = ({ navigation }) => {
    //URL
    const URL = 'https://61a184186c3b400017e69d11.mockapi.io/clientes';

    //State de la APP
    const [clientes, guardarClientes] = useState([]);
    const [consultarAPI, guardarConsultarAPI] = useState(true);

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const resultado = await axios.get('https://61a184186c3b400017e69d11.mockapi.io/clientes');
                guardarClientes(resultado.data);
                guardarConsultarAPI(false);
            } catch (error) {
                console.log(error);
            }
        }

        if (consultarAPI) {
            obtenerClientesApi();
        }
    }, [consultarAPI])

    return (
        <View style={globalStyles.contenedor}>

            <Button style={styles.boton} icon="plus" mode='contained' onPress={() => navigation.navigate('NuevoCliente', { guardarConsultarAPI })} >
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}> {clientes.length > 0 ? "Clientes" : "Aún no hay clientes"}</Headline>

            <FlatList
                data={clientes}
                keyExtractor={cliente => cliente.id.toString()}
                renderItem={({ item }) => (
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
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20,
        backgroundColor: '#2a9d8f'
    },
    boton: {
        marginTop: 20,
        backgroundColor: '#2a9d8f',
    },
})

export default Inicio;