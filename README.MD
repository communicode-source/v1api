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
npm run dev
```


## RULES AND GUIDELINES

### General Rules
- Functions must have a single purpose.
- Handlers have only CRUD functions.
- **All** logic must be placed into the controller folder unless for a *very* good reason.

### Folder Purposes
1. bin
  - This is where server.js lives. Not much to do here.
2. config
  - This is where important configuration values and methods live.
  - Some files in here are purposefully not committed to Github because of privacy.
3. controller
  - This is where **all** logic goes.
  - Sub folders here are used for isolating a specific route or handler's logic.
  - No free floating files in the controller folder, must be located in a subfolder.
4. db
  1. handler
    - This is how the rest of the application will interact with a collection.
    - This is the only folder that will have files that will directly require the models.
    - These handler files may only contain four kinds of methods:
      - Create, creating records.
      - Read, reading records.
      - Update, updating records.
      - Destroy, destroying records.
  2. model
    - This is the mongoose schema for the collection in the Mongo database.
    - Contains only the schema, and schema-specific methods.
5. middleware
  - All middleware declaration happens in the /middleware/index.js file.
  - Any middleware not from node_modules must be located in a subfolder.
  - All logic will still be located in a controller and required over into the middleware function if it requires logic.
6. routes
  - This is where all routes go.
  - In routes/index.js, the JSON holds the route subject, and then the included router that contains the actual content.
  - All router content will be located within a subfolder of this directory.
  - Contains no logic. All of it is required from a controller.
  - Syntax should be simple else there is too much going on and the logic needs to be put elsewhere.

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
