const campanhas = [];
let proximoId = 1;

export class ErroDeValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ErroDeValidacao';
    }
}

export function listar() {
    return campanhas;
}


 export function cadastrarCampanha(titulo, descricao, meta, status) { 

    if (!titulo || !descricao || !meta || !status) {
    throw new ErroDeValidacao("Todos os campos (titulo, descricao, meta, status) são obrigatórios.");
  }

    if (typeof meta !== 'number' || meta <= 0) {
    throw new ErroDeValidacao("A meta deve ser um número maior que zero.");
  }


  const novaCampanha = { 
    id: proximoId,
    titulo: titulo,
    descricao: descricao,
    meta: meta,
    status: status
  }

   campanhas.push(novaCampanha);
   proximoId++;
   return novaCampanha;
};

//fazer function do id
