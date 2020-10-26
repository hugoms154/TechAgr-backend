# Twiddit

## Instalação

Instale as dependências do projeto
```bash
yarn install
```

Para executar o projeto é necessário ter um servidor mongo em execução. Caso esteja usando Docker certifique-se de que o container está em execução.

Caso queira instalar o container do mongo execute o comando
```bash
docker run --name <containerName> -p 27017:27017 -d -t mongo
```

Caso seu mongo não esteja utilizando a `porta 27017` altere no arquivo `ormconfig.json` (dentro da pasta raiz do backend) para a porta correta.

Agora o projeto já está pronto para rodar!

Para rodar em modo de desenvolvimento, execute
```bash
yarn dev:server
```



## Rotas da aplicação

### Posts

#### GET: `/posts` </br>
Retorna todos os posts cadastrados com junto com todos seus respectivos comentários.

#### Response:
```ts
  []: Post[]
```


#### GET: `/posts/:id`</br>
Retorna um post específico junto com todos seus respectivos comentários.

#### Request:

Pathname
```ts
  id: Post ID
```

#### Response:
```ts
  []: Post[]
```



#### POST: `/posts` </br>
Cadastra um post no sistema
#### Request:

Body
```ts
  {
    title: String;
    content: String;
    comments: Post[];
  }
```

#### Response:
```ts
  Post : {
    id: ObjectID;
    title: String;
    content: String;
    comments: Post[];
  }
```



### Comentários

#### POST: `/posts/append/:id` </br>
Cadastra um comentário em um determinado post

#### Request:
Pathname
```
  id: Post ID
```

Body
```ts
  {
    content: String;
    comments: Post[];
  }
```

#### Response:
```ts
  Post : {
    id: ObjectID;
    title: String;
    content: String;
    comments: Post[];
  }
```
