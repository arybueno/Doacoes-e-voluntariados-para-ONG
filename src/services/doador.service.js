import * as model from '../models/doador.model.js'

export class ErroDeValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ErroDeValidacao';
    }
}

function paraFormatoDaApi(documento) {
    return {
        id: documento._id.toHexString(),
        nome: documento.nome,
        email: documento.email
    };
}

export async function listar() {
    const documentos = await model.buscarTodas();
    return documentos.map(paraFormatoDaApi);
}

export async function buscarPorId(id) {
    const documento = await model.buscarPorId(id);
    if (!documento) {
        return null;
    }
    return paraFormatoDaApi(documento);
}

export async function cadastrarDoador(nome,email) {
    if (!nome || !email ) {
        throw new ErroDeValidacao("Todos os campos (nome e email) são obrigatórios.");
    }


    const novoDoador = {
        nome: nome,
        email: email
    };

    const insertedId = await model.inserir(novoDoador);
    return paraFormatoDaApi({ _id: insertedId, ...novoDoador });
}
