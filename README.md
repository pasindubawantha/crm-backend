This application is hosted at This app is hosted at [http://13.215.83.42/ 🚀](http://13.215.83.42/)   


## Getting Started
* Install dependencies `npm install`. 
* Configure the application:
  * Duplicate the configuration file `_env` and rename it as `.env`
  * Edit the file `.env`
* Start the server `npm run start`. 
* Add dummy data (customers) 
  * Run `mongoimport -d <database name> --drop --jsonArray <mongodb uri> ./sample_data/customers.json` 
  * Example: `mongoimport -d crm_mvp --drop --jsonArray mongodb://localhost:27017 ./sample_data/customers.json`

**`.env` file variable description:** 

| Key | Description | Example |
|-----|-------------|---------|
| PORT | The port for running the backend | PORT=4000 |
| NODE_ENV | The mode of execution of Node.js. Choose between: production or development | NODE_ENV=production |
| MONGODB_URI | MongoDB URI to connect to database | MONGODB_URI=mongodb://localhost:27017/crm_mvp |



## Requirements
* MongoDB - version: v6.0.1 (datastore)
* Node - version: v16.17.0 (graphql server)
* mongoimport - version: 100.6.0 (required to import dummy data)

## To Do
* Handle CORS
* Setup linter
* Setup Jest for testing
