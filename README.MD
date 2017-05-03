# Version 1: API.

## INSTALLATION

**Please follow all instructions regarding comments and naming conventions.**

**_Dependencies you will need!_**
- Git
- Node and npm
- Redis-CLI / Redis-Server
- Mongo

### To download Git:
[Install Github](https://help.github.com/desktop/guides/getting-started/installing-github-desktop)

### To download Node & npm:
[Install Node](https://nodejs.org/en/download/)

### To download Redis:
[Installing Redis Instructions](https://redis.io/topics/quickstart).

### To download Mongo:
[Installing Mongod](https://docs.mongodb.com/manual/installation/)

### Getting started:
To get started clone this repository
```
git clone https://github.com/communicode-source/v1api.git
```

Then, run these commands
```
npm install
npm install -g nodemon
```

Note, to install nodemon globally, you will need admin or root rights.

Finally, to start the server, run
```
nodemon bin/server.js
```


## RULES AND GUIDELINES

### General Rules
- Functions must have a single purpose.
- Handlers have only CRUD functions.
- **All*** logic must be placed into the controller folder unless for a *very* good reason.

### Commenting
Documentation *must* be used.
- Comments must be located directly above declaring a class, variable, or function.
- Comments for files must be placed after the dependencies, but before anything else.
- Files must have the following explicitly declared in comments:
  - Purpose.
  - Dependencies (what they are used for).
- Classes must have the following explicitly declared in comments:
  - General purpose of having a class.   
  - Methods.
  - Dependencies for the class.
- Functions must have the following explicitly declared in comments:
  - Purpose.
  - Parameters.
  - Return values.
  - Dependencies if not declared in a class.
