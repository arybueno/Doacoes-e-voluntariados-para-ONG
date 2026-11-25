import * as model from '../models/doacao.model.js';
import * as campanhaModel from '../models/campanha.model.js';

export class ErroDeValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ErroDeValidacao';
    }
}

function paraFormatoDaApi(documento) {
    return {
        id: documento._id.toHexString(),
        valor: documento.valor,
        campanhaId: documento.campanhaId,
        doadorId: documento.doadorId,
        data: documento.data
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

export async function cadastrarDoacao(valor, campanhaId, doadorId, data) {
    if (!valor || !campanhaId || !doadorId || !data) {
        throw new ErroDeValidacao("Todos os campos (valor, campanhaId, doadorId, data) são obrigatórios.");
    }

    if (typeof valor !== 'number' || valor <= 0) {
        throw new ErroDeValidacao("O valor da doação deve ser maior que zero.");
    }

    const campanha = await campanhaModel.buscarPorId(campanhaId);
    if (!campanha) {
        throw new ErroDeValidacao("Campanha não encontrada.");
    }

    if (campanha.status === 'FECHADA') {
        throw new ErroDeValidacao("Campanha fechada.");
    }

    const novaDoacao = {
        valor,
        campanhaId,
        doadorId,
        data
    };

    const insertedId = await model.inserir(novaDoacao);
    return paraFormatoDaApi({ _id: insertedId, ...novaDoacao });
}
