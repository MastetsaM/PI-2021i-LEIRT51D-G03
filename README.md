
<br />
<p align="center">
  <a href="https://github.com/MastetsaM/PI-2021i-LEIRT51D-G03">
    <img src="Wiki/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Trabalho de PI 2020/21</h3>


<details open="open">
<summary>Table of Contents</summary>
		<ol>
				<li>
						<a href="#wiki-trabalho-1">Trabalho 1</a>
						<ul>
								<li><a href="#servidor">Servidor</a></li>
								<li><a href="#web-api">Web API</a></li> 
								<li><a href="#testes-trab1">Testes-Trab1</a></li> 
						</ul>
				</li>
				<li>
						<a href="#wiki-trabalho-2">Trabalho 2</a>
						<ul>
								<li><a href="#instalação">Instalação</a></li>
								<li><a href="#como-usar">Como Usar</a></li>
								<li><a href="#testes-trab2">Testes-Trab2</a></li> 
						</ul>
				</li>
				<li>
						<a href="#wiki-trabalho-3">Trabalho 3</a>
				</li>
		</ol>
</details>

# Wiki-Trabalho 1

Neste trabalho foi pedido para criarmos um servidor que tenha como funcionalidade pesquisar por determinados jogos e armazena-los num conjunto de grupos. A pesquisa dos jogos é realizada através da [web API](https://api-docs.igdb.com/#examples), disponibilizada pelo site [IGDB](https://igdb.com/). O tratamento dos grupos tambem é realizado, sendo que o utilizador possui a capacidade de criar, editar ou visualizar os grupos.

## Servidor
O servidor é constituido por 5 módulos, apresentando dependências entre si:
-   `covida-server.js`  - Ficheiro que constitui o ponto de entrada na aplicação servidora.
-   `covida-web-api.js`  - Implementação dos rotas HTTP que constituem a API REST da aplicação Web.
-   `covida-services.js`  - Implementação da lógica de cada uma das funcionalidades da aplicação.
-   `igdb-data.js`  - Acesso à API IGDB.
-   `covida-db.js`  - Acesso ao à base de dados.

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
		

## Testes-Trab1
Para verificar as funcionalidades de cada modulo foram criados diversos testes.

Para validar as funcionalidades da **web-api** utilizou-se o postman em conjunção com o modulo **covida-server-mocha**
De modo a ter resultatos esperados nos testes presentes no postman é necessario o uso do modulo **covida-server-mocha**

Para a validação dos restantes modulos utilizou-se testes **mocha**, isto é, os testes unitarios presentes na pasta test 



# Wiki-Trabalho 2

O objetivo principal desta parte é refazer o código implementado (_refactor_) de modo a incorporar as tecnologias e técnicas entretanto abordadas em PI, nomeadamente o suporte para _Promises_ e as construções `async`/`await` da linguagem JavaScript e armazenar os dados geridos pela aplicação na base de dados ElasticSearch.
## Requisitos funcionais

1.  A funcionalidade de remover groupos foi adicionada nos modulos **covida-db-js** e **elastisearch.js** atravez da função ***removeGame*** que remove o groupo pretendido de acordo com o Id passado.
	    
2.  De modo a ser possivel ter diversos groupos com o mesmo nove introduzimos o **ID**. Deste modo podemos ter varios groupos com o mesmo nome, pois todos os groupos têm um ID unico.


## Requisitos não funcionais

1.  A implementação dos módulos  `covida-db`,  `igdb-data`,  `covida-service`  e  `covida-web-api` sofreu alteraçoes relativamente ao primeiro Trabalho, substituindo a utilização de  _callbacks_  por um idioma assíncrono baseado em  `Promise`  e/ou em  `async/await`. Os respetivos  _mocks_  e testes unitários devem ser adaptados em conformidade com a nova API. Garanta que o correto funcionamento de todos os módulos é validado por testes unitários. Ainda que o modulo `covida-db.js` não seja utilizado durante execução do programa, este foi elterrado de acordo com o proposto neste ponto.
    
3.  Alterar a utilização do módulo  `urllib`  passando a utilizar o seu suporte para promises, ou substituir a sua utilização pelo o módulo  [`node-fetch`](https://www.npmjs.com/package/node-fetch)  para realizar pedidos http.
    
4.  Criar um novo módulo que substitui o  `covida-db`  de modo a que os dados sejam armazenados numa base de dados ElasticSearch. Esta alteração não deve implicar qualquer alteração adicional nos restantes módulos da aplicação. A interação com o ElasticSearch deve ser feita através da sua API HTTP e, como tal, nenhum módulo específico para esta base de dados pode ser usado. Ao realizar esta alteraçao obtemos as seguintes dependência entre módulos:
   ```sh
   covida-server.js-> covida-web-api.js-> covida-services.js-> igdb-data.js
   							 -> elasticsearch.js
   ``` 
   
## Instalação

1. Clonar o Repositorio
   ```sh
   git clone https://github.com/MastetsaM/PI-2021i-LEIRT51D-G03.git
   ```
2. Instalar os pacotes NPM 
   ```sh
   npm install
   ```
3. [Download Elasticsearch](https://www.elastic.co/downloads/elasticsearch)

## Como Usar
**# Pré-requisitos -** De modo a executar o programa com sucesso é necessario realizar a <a href="#instalação">instalação</a>
1. Abrir a pasta do Trabalho 2
2. Abrir o terminal(Prompt de Comando)
3. Iniciar o servidor
   ```sh
   node .\covida-server.js
   ```
4. Iniciar a Base de dados
   ```sh
   Run `bin/elasticsearch` (or `bin\elasticsearch.bat` on Windows)
   or
   Run `curl http://localhost:9200/` or `Invoke-RestMethod http://localhost:9200` with PowerShell
   ```
5. Esta pronto a usar. Basta utilizar os links abaixo para oraganizar os seus grupos

||**IGDB Options**||
|-|-------|-------|
||Popular Games|http://localhost:8888/Game/Popular|
||Get Game|http://localhost:8888/Game/:game|
||**Group Options**||
||Create New Group|http://localhost:8888/group/newGroup|
||Edit Group|http://localhost:8888/group/:groupId|
||List Of Groups|http://localhost:8888/group/list|
||Get Group|http://localhost:8888/group/:groupId|
||Add Game|http://localhost:8888/group/:groupId|
||Remove Group|http://localhost:8888/group/:groupId|
||Games By Rate|
||Minimum|http://localhost:8888/group/:groupId/min/:minRating|
||Maximum|http://localhost:8888/group/:groupId/max/:maxRating|
||Min and Max|http://localhost:8888/group/:groupId/:minRating/:maxRating|

### Body:
As opções **Create New Group** e  **Edit Group** necessitam de um body com a seguinte estrutura
   ```sh
   {
	"name": "GROUP NAME",
	"desc": "GROUP DESCRIPTION"
}
   ```

### Deve substituir os seguintes elementos:
   ```sh
   :game		-> Nome do jogo a pesquisar
   :groupId	-> Id do grupo a interagir
   :minRating	-> Valor minimo do total_rating dos jogos a apresentar 
   :maxRating	-> Valor maximo do total_rating dos jogos a apresentar
   ```

## Testes-Trab2
Para este trabalho foram realizados 2 tipos de testes. Testes para o servidor como um todo e testes para os modulos `covida-db`,  `igdb-data`,  `covida-service`, idividualmente. Ambos os testes têm que ser realizados na pasta do segundo trabalho.

Os teste para o servidor foram realizadas através da biblioteca ***frisby***, pelo que para correr os mesmos é necessario o uso do seguinte codigo, no Prompt de Comando: **npx jest**. Um outro modo para testar o sergidor é através dos testes do **postman**. No entanto para que os testes do postman possam funcionar é necesssario correr todos em simultaneo. Para correr os testes individualmente é necessario garantir as condiçoes necessarias para cada teste (Exemplo: ter groupo criado para testar a funcionalidade de editar grupos). Para correr os testes, tanto com o postman, como com o frisby, é necessario que o servidor e o elasticsearch estejam iniciados.
<p align="center">
  <a href="https://github.com/MastetsaM/PI-2021i-LEIRT51D-G03">
    <img src="Wiki/postman1.png" alt="Logo" width="80" height="80">
    <img src="Wiki/postman2.png" alt="Logo" width="80" height="80">
  </a>
Para os testes unitarios utilizou-se a biblioteca ***chai***, sendo por isso necessario o uso do codigo **npm test**.


# Wiki-Trabalho 3
