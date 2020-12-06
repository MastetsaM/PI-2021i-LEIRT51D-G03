### Wiki

# Trabalho 1

Neste trabalho foi pedido para criarmos um servidor que tenha como funcionalidade pesquisar por determinados jogos e armazena-los numa conjunto de grupos. A pesquisa dos jogos é realizada através da [web API](https://api-docs.igdb.com/#examples), disponibilizada pelo site [IGDB](https://igdb.com/). O trabamento dos grupos tambem é realizado, sendo que o utilizador possui a capacidade de criar, editar ou visualizar os grupos.

## Servidor
O servidor é constituido por 5 módulos, apresentando dependencias entre si.
-   `covida-server.js`  - ficheiro que constitui o ponto de entrada na aplicação servidora
-   `covida-web-api.js`  - implementação dos rotas HTTP que constituem a API REST da aplicação Web
-   `covida-services.js`  - implementação da lógica de cada uma das funcionalidades da aplicação
-   `igdb-data.js`  - acesso à API IGDB.
-   `covida-db.js`  - acesso ao repositório em memória.

As dependência entre estes módulos é a seguinte:

	covida-server.js -> covida-web-api.js -> covida-services.js -> igdb-data.js
						        	    -> covida-db.js
### igdb-data.js
O módulo igdb-data é responsavel por:												
-   Obter a lista dos jogos mais populares
-   Pesquisar jogos pelo nome
### covida-db.js
O módulo covida-db gerir grupos de jogos favoritos
-   Criar grupo atribuindo-lhe um nome e descrição
-  Editar grupo, alterando o seu nome e descrição
- Listar todos os grupos
- Obter os detalhes de um grupo, com o seu nome, descrição e nomes dos jogos que o constituem.
- Adicionar um jogo a um grupo
- Remover um jogo de um grupo
- Obter os jogos de um grupo que têm uma votação média (total_rating) entre dois valores (mínimo e máximo) entre 0 e 100, sendo estes valores parametrizáveis no pedido. Os jogos vêm ordenadas por ordem decrescente da votação média.
