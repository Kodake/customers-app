import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Headline, Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import globalStyles from "../styles/global";

const NuevoCliente = () => {

    //Campos formulario
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    //Almacenar cliente
    const guardarCliente = () => {
        //Validar cliente
        if (nombre.trim() === '' || telefono.trim() === '' || correo.trim() === '' || empresa.trim() === '') {
            guardarAlerta(true);
            return;
        }

        //Generar el cliente
        const cliente = { nombre, telefono, correo, empresa }
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Agregar Nuevo Cliente</Headline>

            <TextInput
                label="Nombre"
                placeholder="Ej. John Doe"
                onChangeText={(texto) => guardarNombre(texto)}
                value={nombre}
                style={styles.input}
            />

            <TextInput
                label="Teléfono"
                placeholder="Ej. 8095559595"
                onChangeText={(texto) => guardarTelefono(texto)}
                value={telefono}
                style={styles.input}
            />

            <TextInput
                label="Correo"
                placeholder="Ej.correo@correo.com"
                onChangeText={(texto) => guardarCorreo(texto)}
                value={correo}
                style={styles.input}
            />

            <TextInput
                label="Empresa"
                placeholder="Ej. Empresa X"
                onChangeText={(texto) => guardarEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button mode='contained' onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;