import { Cliente } from "./cliente";

export interface Pet{
    id: string;
    nome: string;
    especie: string;
    raca: string;
    altura: number;
    peso: number;
    tipoPelagem: string;
    tipoTratamento: string;
    clienteResponsavel: Cliente
}