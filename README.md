## Text Complexity API

### Environment
This app requires Node.js and MongoDB in your local environment.

### Configuration
See `config.js` to set up _port_ and _database connection url_ to match your local environment.

### Initializing Database

A __MongoDB__ is used to stored the sample non-lexical words. To initialize the database run the following command:

```
node src/seedDatabase.js 
```

__note__: This will clear the database

### Running the App
 ```
npm install
npm start
```
##### Example of valid requests
```
POST http://localhost:3001/complexity
     {"input": "Kim loves going to the cinema"}

POST http://localhost:3001/complexity?mode=verbose
     {"input": "Kim loves going to the cinema"}
```

### Tests
Run unit tests and integration/API tests:
```
npm test
```
