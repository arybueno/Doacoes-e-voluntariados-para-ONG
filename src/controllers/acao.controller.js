import * as service from '../services/acao.service.js';
import { ErroDeValidacao } from '../services/acao.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as ações.' });
  }
}

export async function buscarPorId(req, res) {
  try {
    const acao = await service.buscarPorId(req.params.id);
    if (!acao) {
      return res.status(404).json({ error: 'Ação não encontrada.' });
    }
    res.json(acao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao buscar a ação.' });
  }
}

export async function criar(req, res) {
  try {
    const { nome, descricao, data, voluntarios } = req.body ?? {};
    const acao = await service.cadastrarAcao(nome, descricao, data, voluntarios );
    res.status(201).json(acao);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao criar a ação.' });
  }
}
