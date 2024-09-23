# :checkered_flag: Chronogram

Breve descrição do que o seu projeto faz.

O "Chronogram" é uma rede social de gerenciamento de tempo que busca ajudar os estudantes a se organizarem de forma ótima através da fixação de metas de estudos e da interação com outros membros da rede.

A interação pode se dar de diferentes formas, desde um simples compartilhamento de uma nova meta geral, como tirar 10 em uma AP1 através do estudo de 20 horas semanais, por exemplo, até a publicação de um comentário no post de um amigo onde ele fala sobre o seu relatório de progresso semanal na disciplina de "desenvolvimento web" ou, até mesmo, a criação de comunidades de estudo, onde os usuários podem compartilham suas metas, progressos, fracassos e aprendizados.

Portanto, o objetivo principal do "Chronogram" é tornar o gerenciamento de tempo divertido e motivador ao passo que proporciona que os seus usuários possam interagir com uma vasta rede de pessoas que compartilham os mesmos objetivos, dificuldades e felicidades que elas. 

## :technologist: Membros da equipe

Gabriel Dias - 540357 - CC 

Gustavo Reginaldo - 536187 - CC

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Usuário não logado, usuário logado, admininstrador, membro da comunidade


## :spiral_calendar: Entidades ou tabelas do sistema

Usuário, Postagem, Comunidade

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não logado -> Pode usar o cronometro para marcar o seu tempo e ver o perfil dos usuários, pode também ver seu progresso, mas não terá um perfil.
Usuário logado -> Pode ter um perfil, comentar e fazer postagens e solicitar uma comunidade.
Admininstrado -> Excluir posts, banir usuários, aprovar uma comunidade. 


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
