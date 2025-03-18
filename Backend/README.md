# Backend

## Pacotes escolhidos

### express
    - Framework utilizado para ligar o servidor
### bcrypt
    - Pacote com funções de criptografia, utilizado para criptografar a senha
### dotenv
    - Pacote para auxiliar na leitura das variáveis do arquivo .env
### jsonwebtoken
    - Pacote para auxiliar na criação e controle do token JWT
### knex
    - Pacote completo para criações de migrations
### mysql2
    - Pacote de consultas no banco mysql

## Configurando o ambiente
### Arquivo .env
Para o funcionamento do servidor de forma correta é nescessário configurar o arquivo .env com as seguintes variáveis

- PORT (Porta do servidor local)
- JWT_SECRET (Chave do JWT)
- FRONTURL (URL do Frontend)
- DB_HOST (Host do banco de dados)
- DB_PORT (Porta do banco de dados)
- DB_NAME (Nome da base no banco de dados)
- DB_USER (Nome do usuário do banco de dados)
- DB_PASSWORD (Senha do usuário do banco de dados)

### Configuração do ambiente
Assim como em qualquer outro projeto, para configurar todos os pacotes é nescessário executar o 

```npm i```

### Configuração do Knex
Para a utilização do knex de forma prática, é nescessário rodar o seguinte comando

```npm install knex -g```

Ao realizar esse comando, será possível realizar o migration executando o seguinte comando

```knex migrate:up```