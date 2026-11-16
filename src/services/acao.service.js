import * as model from '../models/acao.model.js'

export class ErroDeValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ErroDeValidacao';
    }
}

function paraFormatoDaApi(documento) {
    return {
        id: documento._id.toHexString(),
        titulo: documento.titulo,
        descricao: documento.descricao,
        meta: documento.meta,
        status: documento.status
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

export async function cadastrarAcao(titulo, descricao, meta, status) {
    if (!titulo || !descricao || !meta || !status) {
        throw new ErroDeValidacao("Todos os campos (titulo, descricao, meta, status) são obrigatórios.");
    }

    if (typeof meta !== 'number' || meta <= 0) {
        throw new ErroDeValidacao("A meta deve ser um número maior que zero.");
    }

    const novaAcao = {
        titulo: titulo,
        descricao: descricao,
        meta: meta,
        status: status
    };

    const insertedId = await model.inserir(novaAcao);
    return paraFormatoDaApi({ _id: insertedId, ...novaAcao });
}
