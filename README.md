# Tormenta Back

**Descrição do Projeto**

Este é o backend para o projeto Tormenta, uma aplicação que gerencia ameaças (monstros, criaturas, etc.) para jogos de RPG.

**Instruções de Início Rápido**

1. **Clonando o Repositório**

  ```bash
    git clone https://github.com/MarllonCampos/tormenta-back.git
    cd tormenta-back
  ```
  1. Instalando dependências
    ```bash
      npm install
    ```
  2. Configurando o banco de dados
    - Configure as informações do banco de dados no arquivo `.env.`
  3. Executando o Servidor
    ```bash
      npm start
    ```
    O servidor estará rodando em http://localhost:3000 por padrão.
  4. Documentação da API
    - Acesse a documentação da API em http://localhost:3000/api-docs.
  ## Configuração do Banco de Dados (Exemplo .env)
    ```env
      DATABASE_URL="" # A URL do seu banco de dados
      PORT=3000 # Em que porta o servidor deverá rodar
    ```
  ## Requisitos do Sistema
    - Node.js (Versão Mínima: v18.16.0)
    - MySQL (Ou qualquer outro banco suportado: [documentação oficial do Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases) )
  
  ## Contribuição
    Fique à vontade para contribuir! Crie um fork do projeto, faça suas alterações e envie um pull request.
