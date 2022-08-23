This app is hosted at This app is hosted at [http://13.215.83.42/ 🚀](http://13.215.83.42/)   

## To Do
* Handle CORS
* Setup linter
* Setup Jest for testing

## Getting Started
* Install dependenceies `npm install`. 
* Configure the application:
  * Duplicate the configuration file `_env` and rename it as `.env`
  * Edit the file `.env`
* Start the server `npm run start`. 

**`.env` file detils:** 

| Key | Description |
|-----|-------------|
| PORT | The port for running the backend |
| NODE_ENV | The mode of execution of Node.js. Choose between: production or development |
| MONGODB_URI | MongoDB URI to connect to database |

## Adding data
- run `mongoimport -d <database name> --drop --jsonArray <mongodb uri> ./sample_data/customers.json` 
  - example `mongoimport -d crm_mvp --drop --jsonArray mongodb://localhost:27017 ./sample_data/customers.json`

## Requirements
* MongoDB Database
* Node