# Desafio Técnico Globo

## Objetivo
Construir um ambiente de comunicação entre o Frontend e o Backend para o site IMDb.

## Linguagens e Frameworks escolhidos

### Typescript
- O mesmo fornece maior Segurança e qualidade do código, maior produtividade e também facilidade de manutenção no futuro.

### Frontend
- **Utilizado**: React utilizando o Framework Next.js
- **Motivo**:
    1. Desempenho Otimizado: O Next.js oferece SSG e SSR nativos, garantindo páginas rápidas.
    2. Componentização e Escalabilidade: Facilita a criação e uma aplicação modular e reutilizável.
    3. Integração com API's: Suporta facilmente integração com API's externas, como o backend.
    4. Autenticação Segura: Oferece suporte a integração de autenticação JWT.
- **Por que não Angular?**: 
    * Além de React ser a linguagem onde me encontro mais familiarizado, acredito que para projetos maiores um framework como React possui uma comunidade maior para uma maior escalabilidade do mesmo.

### Backend
- **Utilizado**: Node.js utilizando o Framework Express.js
- **Motivo**:
    1. Desempenho e Escalabilidade: O Node.js é altamente eficiente em termos de desempenho e manipulação de várias requisições simultanemente
    2. Unificação e Linguagem: Assim no Frontend, o Backend utilizará a mesma linguagem, sendo ela principalmente Typescript
    3. Grande Ecosystem: Com os pacotes npm, ele oferece uma gama de funcionalidades e integrações.
    4. Facilidade no Desenvolvimento: Com o Framework o Express.js é o ideal para criações de API's RESTFul rápidas e leves
- **Por que não Spring Boot**:
    * O Node.js foi escolhido pois é aquele que eu possuo mais conhecimento. Mesmo com conhecimento em JAVA, eu nunca cheguei a mexer com o Spring Boot em si.

### Banco de Dados
- **Utilizado**: MySql
- **Motivo**:
    1. Integração com o Backend: O MySql utilizando bibliotecas como a mysql2 é possível fazer consultas de forma rápida e segura
    2. Migrations: Facilidade em criações de Migrations e Modelos de dados

### Documentação
- **Utilizado**: ERD Concepts 8 e Markdown
- **Motivo**:
    1. Markdown é o mais utilizado atualmente para registros e documentação e também o mais completo
    2. ERD Concepts 8 é um software que eu costumo utilizar para criação da estrutura de dados, como todas suas chaves, tabelas e ligações

## Passo a Passo
1. Definição de quais linguagens, frameworks e métodos utilizar
2. Documentação inicial, OpenAPI e criação do ERD com a estrutura das tabelas
3. Instalação de dependências tanto para o Front quanto para o Back
4. Criação do migration utilizando Knex (Ao realizar o migration, ele adiciona um usuário admin com a senha Admin123 para realização dos testes)
5. Criação das rotas, controllers e tudo para o Backend funcionar corretamente
6. Documentação em Markdown do backend, com informações para configuração e Postman para testes