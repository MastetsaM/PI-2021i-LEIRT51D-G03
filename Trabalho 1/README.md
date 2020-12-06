<<<<<<< HEAD
# Wiki - Trabalho 1

Neste trabalho foi pedido para criarmos um servidor que tenha como funcionalidade pesquisar por determinados jogos e armazena-los num conjunto de grupos. A pesquisa dos jogos é realizada através da [web API](https://api-docs.igdb.com/#examples), disponibilizada pelo site [IGDB](https://igdb.com/). O tratamento dos grupos tambem é realizado, sendo que o utilizador possui a capacidade de criar, editar ou visualizar os grupos.

## Servidor
O servidor é constituido por 5 módulos, apresentando dependências entre si:
-   `covida-server.js`  - Ficheiro que constitui o ponto de entrada na aplicação servidora.
-   `covida-web-api.js`  - Implementação dos rotas HTTP que constituem a API REST da aplicação Web.
-   `covida-services.js`  - Implementação da lógica de cada uma das funcionalidades da aplicação.
-   `igdb-data.js`  - Acesso à API IGDB.
-   `covida-db.js`  - Acesso ao repositório em memória.

As dependência entre estes módulos é a seguinte:

	covida-server.js -> covida-web-api.js -> covida-services.js -> igdb-data.js
	                                                            -> covida-db.js
**igdb-data.js** - O módulo igdb-data é responsavel por:												
 -   Obter a lista dos jogos mais populares.
 -   Pesquisar jogos pelo nome.

**covida-db.js** - O módulo covida-db gerir grupos de jogos favoritos:
-   Criar grupo atribuindo-lhe um nome e descrição
-  Editar grupo, alterando o seu nome e descrição
- Listar todos os grupos
- Obter os detalhes de um grupo, com o seu nome, descrição e nomes dos jogos que o constituem.
- Adicionar um jogo a um grupo
- Remover um jogo de um grupo
- Obter os jogos de um grupo que têm uma votação média (total_rating) entre dois valores (mínimo e máximo) entre 0 e 100, sendo estes valores parametrizáveis no pedido. Os jogos vêm ordenadas por ordem decrescente da votação média.


## Web API
A funcionalidade da **covida-web-api.js** é tratar os pedidos recebidos, decidindo o tipo de pedido HTTP e a funcionalidade. Este tratamento depende do URL utilizado na realização dos pedidos.

- igdb-data
	- `/game/popular` - Retorna os 50 jogos mais populares.
				`[ { "id": 141408, "name": "Zaos", "rating": 100, "total_rating": 100 }, ...]`
				
	- `/game/:game` - No caso de existir irá retornar o jogo pretendido. Necessita receber o nome de um jogo.
    `{"id":131887,"name":"Project +","total_rating":100}`

- covida-db
	- `/group/newGroup` - Utilizado para criar novos grupos. Recebe um grupo novo, com nome e descrição.
	`{"id":0,"name":"faforitos","description":"esta é a versão errada","games":null}`
	
	- `/group/edit/:groupId` - Utilizado para criar editar grupos. Recebe o novo nome e descrição.
	`{"id":0,"name":"favoritos","description":"versao editada","games":null}`
	
	- `/group/list` - Utilizado para conseguir visualizar todos os grupos existentes.
	`[{"id":0,"name":"favoritos","description":"versao editada","games":null}]`
	
	- `/group/info/:groupId` - Utilizado para visualizar um determinado grupo, com base no seu id. 
	`{"id":0,"name":"favoritos","description":"versao editada","games":null}`
	
	- `/group/addGame/:groupId/game/:game` - Utilizado para adicionar novos jogos, recebendo o nome de um jogo.
	`{"id":26472,"name":"Disco Elysium","total_rating":92.56569534922265}`
	
	- `/group/removeGame/:groupId/game/:game` - Utilizado para remover jogos de um grupo, recebendo o nome do jogo.
	`[{"id":26472,"name":"Disco Elysium","total_rating":92.56569534922265},
	{"id":1105,"name":"Metroid Prime","total_rating":93.63190778180625}]`
	
	- `/group/getGameByRating` -  Utilizado para obter jogos de um dado grupo, cujo rating esteja no intervalo indicado.
	`[{"id":1105,"name":"Metroid Prime","total_rating":93.63190778180625},
	{"id":26472,"name":"Disco Elysium","total_rating":92.56569534922265}]`
		- `/:groupId` - Retorna jogos com rating entre 0 e 100.
		- `/:groupId/min/:minRating` - Retorna  jogos com rating entre minRating e 100.
		- `/:groupId/max/:maxRating` - Retorna  jogos com rating entre 0 e maxRating.
		- `/:groupId/min/:minRating/max/:maxRating` - Retorna jogos com rating entre minRating e maxRating. 
		

## Testes
Para verificar as funcionalidades de cada modulo foram criados diversos testes.

Para validar as funcionalidades da **web-api** utilizou-se o postman em conjunção com o modulo **covida-server-mocha**
De modo a ter resultatos esperados nos testes presentes no postman é necessario o uso do modulo **covida-server-mocha**

Para a validação dos restantes modulos utilizou-se testes **mocha**, isto é, os testes unitarios presentes na pasta test 

