# LexiCOM API

## Descrição

Este projeto tem como objetivo facilitar a busca e uso de palavras inglesas, como seus significados, etimologia, antônimos e sinônimos.

Assim, a API será usada de proxy para a [Free Dictionary API](https://dictionaryapi.dev/).

## Iniciando o projeto

```bash
# Instalação das dependências
$ npm i

# Rodar os programas auxiliares containerizados
$ docker-compose up -d
```

## Executando o projeto

```bash
# Modo de desenvolvimento
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

## Testando

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Requisitos Não Funcionais

- Criar API REST para listar palavras em inglês;
- Utilizar boas práticas de desenvolvimento, como código limpo e validação de chamadas;
- Usar `Node.js` como tecnologia principal com banco de dados;
- Criar script para baixar a lista de palavras do repositório e importar para o banco de dados;

## Requisitos Funcionais

- Sistema de autenticação e autorização;
- Sistema de cacheamento com cabeçalho `X-Cache` e `X-Response-Time`;
- Sistema de histórico de palavras já visualizadas;
- Sistema de recursos Favoritos;

## Requisitos Diferenciais

- Documentação da API;
- Testes unitários;
- Dockerfile do projeto;
- Deploy em algum servidor;
- Método de comunicação assíncrona para persistir palavras favoritas;
- Sistema de paginação por cursor;

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
