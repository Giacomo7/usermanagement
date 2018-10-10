#Nestjs CRUD 

##Installazione
```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

##Scorciatoie
Creazione del model
```bash
$ nest g mo users
```

Creazione del controller
```bash
$ nest g controller users
```

Creazione del service
```bash
$ nest g serviice users/users
```

##Rotte di esempio

####Ottenere tutti gli utenti
[GET] localhost:3000/users

####Creare un utente
[POST] localhost:3000/users
<p>body
{
	"nome": "test",
	"cognome": "test",
	"email" : "test"
}
</p>

####Ottenere un utente su base id
[GET] localhost:3000/users/1


####Modificare un utente
[PUT] localhost:3000/users/1
<p>body
{
	"nome": "test2"
}
</p>

####Cancellare un utente
[DELETE] localhost:3000/users/1