import * as model from '../models/acao.model.js';

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
        descricao: documento.descricao,
        data: documento.data,
        voluntarios: documento.voluntarios
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

export async function cadastrarAcao(nome, descricao, data, voluntarios = []) {
    if (!nome || !descricao || !data) {
        throw new ErroDeValidacao("Os campos nome, descricao e data são obrigatórios.");
    }

    if (!Array.isArray(voluntarios)) {
        throw new ErroDeValidacao("O campo voluntarios deve ser uma lista.");
    }

    const novaAcao = {
        nome,
        descricao,
        data,
        voluntarios
    };

    const insertedId = await model.inserir(novaAcao);
    return paraFormatoDaApi({ _id: insertedId, ...novaAcao });
}
