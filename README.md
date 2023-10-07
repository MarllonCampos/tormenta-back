# Tormenta Back

**Descrição do Projeto**

Este é o backend para o projeto Tormenta, uma aplicação que gerencia ameaças (monstros, criaturas, etc.) para um jogo utilizando o Sistema de Tormenta20.

## **Instruções de Início Rápido**

**Clonando o Repositório**

  ```bash
    git clone https://github.com/MarllonCampos/tormenta-back.git
    cd tormenta-back
  ```
**Instalando dependências**
```bash
  npm install
```
**Configurando o banco de dados**
    - Configure as informações do banco de dados no arquivo .env
```bash
  DATABASE_URL="" # A URL do seu banco de dados
  PORT=3000 # Em que porta o servidor deverá rodar
```
**Executando o Servidor**
```
  npm start
```

**Executando o Servidor Localmente para Desenvolvimento**
```
  npm run dev
```
  O servidor estará rodando em http://localhost:3000 por padrão
  
**Documentação da API**
  - Acesse a documentação da API em http://localhost:3000/api-docs.

## Requisitos do Sistema
  - Node.js (Versão Mínima: v18.16.0)
  - MySQL (Ou qualquer outro banco suportado: [documentação oficial do Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases) )

## Contribuição
  Fique à vontade para contribuir! Crie um fork do projeto, faça suas alterações e envie um pull request.
