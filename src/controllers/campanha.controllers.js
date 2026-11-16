import * as service from '../services/campanha.service.js';
import { ErroDeValidacao } from '../services/campanha.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as campanhas.' });
  }
}

export async function buscarPorId(req, res) {
  try {
    const campanha = await service.buscarPorId(req.params.id);
    if (!campanha) {
      return res.status(404).json({ error: 'Campanha não encontrada.' });
    }
    res.json(campanha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao buscar a campanha.' });
  }
}

export async function criar(req, res) {
  try {
    const { titulo, descricao, meta, status } = req.body ?? {};
    const campanha = await service.cadastrarCampanha(titulo, descricao, meta, status);
    res.status(201).json(campanha);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao criar a campanha.' });
  }
}
