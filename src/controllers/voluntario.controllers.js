import * as service from '../services/voluntario.service.js';
import { ErroDeValidacao } from '../services/voluntario.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar os voluntarios' });
  }
}

export async function buscarPorId(req, res) {
  try {
    const voluntario = await service.buscarPorId(req.params.id);
    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntario não encontrada.' });
    }
    res.json(voluntario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao buscar o voluntario.' });
  }
}

export async function criar(req, res) {
  try {
    const { nome, email, telefone} = req.body ?? {};
    const voluntario = await service.cadastrarVoluntario(nome, email, telefone);
    res.status(201).json(voluntario);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao cadastrar o voluntario' });
  }
}
