import * as model from '../models/voluntario.model.js'

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
        email: documento.email,
        telefone: documento.telefone
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

export async function cadastrarVoluntario(nome, email, telefone) {
    if (!nome || !email || !telefone) {
        throw new ErroDeValidacao("Todos os campos são obrigatórios.");
    }


    const novoVoluntario = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    const insertedId = await model.inserir(novoVoluntario);
    return paraFormatoDaApi({ _id: insertedId, ...novoVoluntario });
}
