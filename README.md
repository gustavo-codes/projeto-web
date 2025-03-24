# :checkered_flag: Chronogram

Breve descrição do que o seu projeto faz.

O "Chronogram" é uma rede social de gerenciamento de tempo que busca ajudar os estudantes a se organizarem de forma ótima através da fixação de metas de estudos e da interação com outros membros da rede.

Você pode entrar em uma comunidade e fazer posts nela. Sem estar logado, é possível apenas ver as postagens.


## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Usuário não logado, usuário logado, admininstrador, membro da comunidade


## :spiral_calendar: Entidades ou tabelas do sistema

Usuário, Postagem, Comunidade

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não logado -> Pode ver as postagens
Usuário logado -> Pode ter um perfil e fazer, editar e excluir suas postagens e solicitar entrar em uma comunidade.
Admininstrado -> Pode criar, editar e excluir uma comunidade. 


----



----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Vue.Js

**Backend:**

 Strapi


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário | X  | X |  |  |
| Postagem | X | X | X | X |
| Comunidade | X | X | X | X |




> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/users |
| POST | api/users/:id |
| GET | api/communities/ |
| POST | api/communities/:id |
| GET | api/posts/ |
| POST | api/posts/:id |
