# Doacoes-e-voluntariados-para-ONG
API desenvolvida com Node.js e Express para gerenciar campanhas de arrecadação, doações e ações de voluntariado em ONGs.

## Instalação

Para instalar as dependências do projeto, execute no terminal:
 - npm install

## Execução

Para iniciar o servidor, execute:

node server.js

# Endpoints

## Campanhas

- GET /campanhas - Lista todas as campanhas.
- GET /campanhas/:id - Busca uma campanha pelo ID.
- POST /campanhas - Cadastra uma nova campanha.
- PUT /campanhas/:id - Atualiza uma campanha.
- DELETE /campanhas/:id - Remove uma campanha.

## Doações

- GET /doacoes - Lista todas as doações.
- GET /doacoes/:id - Busca uma doação pelo ID.
- POST /doacoes - Registra uma nova doação.
- PUT /doacoes/:id - Atualiza uma doação.
- DELETE /doacoes/:id - Remove uma doação.

## Ações

- POST /acoes/:id/voluntarios - Adiciona um voluntário a uma ação.