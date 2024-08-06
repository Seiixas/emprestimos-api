# ⬢ Empréstimos API

![NodeJS logo](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript Logo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres logo](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest logo](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

> Empréstimos API é um back-end responsável por realizar simulações de empréstimos e suas devidas efetivações. Ela é composta por 4 endpoints de leitura e escrita de dados.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Docker 🐳
- Portas 3000 e 5432 disponíveis em sua máquina 🚪
- Um cafézinho quente ☕️

## 🚀 Instalando

Para instalar, siga estas etapas:

Crie um clone do repositório

```
git clone https://github.com/Seiixas/emprestimos-api.git
```

Acesse a pasta e instale as dependências:

```bash
cd emprestimos-api
yarn
```

Adicione as variáveis de ambiente:

```
REDIS_URL=localhost
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teste_tecnico?schema=public"
PORT=3000
API_HOST=http://localhost:3000
```

Rode as migrations:

```
yarn migration:run
```

Caso queira rodar os testes:

```
yarn test
```

Finalmente, inicie o container Docker:

```
yarn docker:build
```

Agora tome um golezinho de café enquanto o container é criado e iniciado.

## ☕ Usando o Empréstimos API

📕 Você pode acessar a documentação da API rodando o projeto e acessando a rota `/api`.

Caso queira acessar a API em produção, utilize o seguinte endpoint: [https://emprestimos-web.onrender.com](https://emprestimos-web.onrender.com)
