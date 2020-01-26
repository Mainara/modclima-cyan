
# Cyan Agroanalytics Challenge

Web project to register units of a sugarcane plant in a database.

## Getting Started

### Prerequisites

To execute this project it is necessary to install NodeJS and Postgres. 

### Installing back-end
Initially go to the folder:
```
cd modclima-cyan-back
```
Install the necessary dependencies:
```
npm install
```
To create the database use the following command:
```
npx sequelize db:create
```
The above command will create the database with the settings present in the _config/database.js_ file. To install the Postgis extension, access the database created and enter the command:
```
CREATE EXTENSION postgis;
```
With the database already configured, the entities and relationships must be created:
```
npx sequelize db:migrate 
```
Now that everything is set up, the server can be started:
```
node index.js
```
### Installing front-end
Initially go to the folder:
```
cd modclima-cyan-front
```
Install the necessary dependencies:
```
npm install
```
Launch the application:
```
npm start
```

NOTE: To use the map in the application, you need to add a google API key in the _apiKey_ variable in the _src/components/map.js_ file. [This link](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br) teaches you how to get this key:
