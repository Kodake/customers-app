import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { Cliente, NewCliente } from "../interfaces/appInterfaces";
import * as yup from 'yup';
import { Alert } from "react-native";
import { VALIDATION_STRINGS } from "../messages/appMessages";

class SharedStateStore {
    nombre = '';
    telefono = '';
    correo = '';
    empresa = '';
    alerta = false;
    cliente: NewCliente | undefined;
    clienteById: Cliente | undefined;
    clientes: Cliente[] = [];
    consultarAPI: boolean = false;
    isSaved: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    clearCliente() {
        this.setNombre('');
        this.setTelefono('');
        this.setCorreo('');
        this.setEmpresa('');
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }

    setTelefono(telefono: string) {
        this.telefono = telefono;
    }

    setCorreo(correo: string) {
        this.correo = correo;
    }

    setEmpresa(empresa: string) {
        this.empresa = empresa;
    }

    setAlerta(alerta: boolean) {
        this.alerta = alerta;
    }

    setIsSaved(isSaved: boolean) {
        this.isSaved = isSaved;
    }

    setCliente(cliente: NewCliente): void {
        this.cliente = cliente
    }

    setClienteById(cliente: Cliente): void {
        this.clienteById = cliente
    }

    setClientes(clientes: Cliente[]): void {
        this.clientes = clientes
    }

    setConsultarAPI(consultarAPI: boolean): void {
        this.consultarAPI = consultarAPI;
    }

    validationSchema = yup.object().shape({
        nombre: yup.string()
          .required(VALIDATION_STRINGS.nombreRequired)
          .min(2, VALIDATION_STRINGS.nombreMinLength)
          .max(50, VALIDATION_STRINGS.nombreMaxLength),
        telefono: yup.string()
          .required(VALIDATION_STRINGS.telefonoRequired)
          .matches(/^[0-9]+$/, VALIDATION_STRINGS.telefonoInvalid)
          .length(10, VALIDATION_STRINGS.telefonoLength),
        correo: yup.string()
          .email(VALIDATION_STRINGS.correoInvalid)
          .required(VALIDATION_STRINGS.correoRequired),
        empresa: yup.string()
          .required(VALIDATION_STRINGS.empresaRequired)
          .min(2, VALIDATION_STRINGS.empresaMinLength)
          .max(100, VALIDATION_STRINGS.empresaMaxLength),
      });

    validateCliente() {
        const cliente = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            empresa: this.empresa,
        };

        try {
            this.validationSchema.validateSync(cliente, { abortEarly: false });
            this.setAlerta(false);
            return true;
        } catch (error) {
            runInAction(() => {
                const validationError = error as yup.ValidationError;
                const errorMessage = validationError.inner.map((e) => e.message).join('\n');
                Alert.alert(VALIDATION_STRINGS.validationError, errorMessage);
            });
            return false;
        }
    }

    async fetchClientes(): Promise<void> {
        const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            runInAction(() => {
                this.setClientes(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async fetchClienteById(id: string): Promise<void> {
        const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes/${id}`;

        try {
            const response = await axios.get(url);
            const cliente = response.data;
            runInAction(() => {
                this.setClienteById(cliente);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async saveCliente(): Promise<void> {
        if (!this.validateCliente()) {
            this.setIsSaved(false);
            return;
        }

        const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes`;

        const newCliente = { nombre: this.nombre, telefono: this.telefono, correo: this.correo, empresa: this.empresa };

        try {
            await axios.post(url, newCliente);
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchClientes();
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateCliente(id?: string): Promise<void> {
        if (!this.validateCliente()) {
            this.setIsSaved(false);
            return;
        }

        const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes/${id}`;

        const updatedCliente = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            empresa: this.empresa
        };

        try {
            await axios.put(url, updatedCliente);
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchClientes();
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteClienteById(id: string): Promise<void> {
        const url = `https://6498b9139543ce0f49e246fa.mockapi.io/api/v2/clientes/${id}`;

        try {
            await axios.delete(url);
            runInAction(() => {
                this.fetchClientes();
            });
        } catch (error) {
            console.error(error);
        }
    }
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;