import * as service from '../services/doacao.service.js';
import { ErroDeValidacao } from '../services/doacao.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as doações.' });
  }
}

export async function buscarPorId(req, res) {
  try {
    const doacao = await service.buscarPorId(req.params.id);
    if (!doacao) {
      return res.status(404).json({ error: 'Doação não encontrada.' });
    }
    res.json(doacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao buscar a Doação.' });
  }
}

export async function criar(req, res) {
  try {
    const { valor, campanhaId, doadorId, data} = req.body ?? {};
    const doacao = await service.cadastrarDoacao(valor, campanhaId, doadorId, data);
    res.status(201).json(doacao);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao registrar a doação.' });
  }
}
