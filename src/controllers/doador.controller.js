import * as service from '../services/doador.service.js';
import { ErroDeValidacao } from '../services/doador.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as doador.' });
  }
}

export async function buscarPorId(req, res) {
  try {
    const doador = await service.buscarPorId(req.params.id);
    if (!doador) {
      return res.status(404).json({ error: 'doador não encontrada.' });
    }
    res.json(doador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao buscar a doador.' });
  }
}

export async function criar(req, res) {
  try {
    const { titulo, descricao, meta, status } = req.body ?? {};
    const doador = await service.cadastrarDoador(nome,email);
    res.status(201).json(doador);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao cadastrar o doador.' });
  }
}
