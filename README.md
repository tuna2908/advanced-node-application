Node Application using
- S3 AWS for storing images
- Redis as Cache server
- MongoDB instance from Mlab for DB
- Testing using Puppeteer and Jest
- Travis for CI server
- Railway.app as publish domain
- Typescripts as static type checker in Development Process
- And so on

# Usage
```
└>cd ./node-server
    "start": npm run start ==> start local instance of the server app
    "start_nodemon": npm run start_nodemon ==> start local instance of the server app under nodemon watcher
    "client": npm run client ==> start local instance of the client react-app
    "test": npm run test ==> run test cases (you must start the server + client app firstly in order to run the tests)
```

## Example
- Init projects
`cd ./node-server npm install` 
and then `cd ../react-client npm install`

- Start projects
`cd ./node-server npm start`
and then `npm run client`
