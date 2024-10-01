# 13c-E-Commerce_Back_End

## Description

E-commerce has become the primary method for businesses to connect with consumers. Therefore it's important for businesses to have applications and platforms to help them manage their data and keep inventory up-to-date. This app builds the bank-end for an e-commerce business and allows the user to update the inventory directly in the database. 

## Installation

This app uses a fully functional Express.js API that integrates Sequelize with PostgreSQL database. It was developed to be used with an API testing app like Insomnia and Postman, and requires the installation of the following:
    - Node.js
    - PostGreSQL

A demo of the app can be found here:
https://drive.google.com/file/d/1lJpntFFGsMDi9ka5GfhPDy39-XEf4fn7/view?usp=sharing

The online repository with all code files can be accessed here:
https://github.com/qbres333/13c-E-Commerce_Back_End

## Features

Users can interact with and update the e-commerce database in real time using GET, PUT, POST, AND DELETE requests in Insomnia or similar web tools. PUT and POST requests require a JSON request body (see code files for more detail). 

## Usage

To begin using this app, download and install Node.js and PostgreSQL. You will also need an app like Insomnia or Postman to test your HTTP requests. Clone the project repo to your desired location. To query the default database, right-click on the "db" folder in the project directory, and select "Open in Integrated Terminal". Type "psql -U postgres" into the terminal, then enter your password when prompted. Use postgreSQL command "\i" to setup the schema.sql file. You can then close this terminal window, or leave it open to enter custom queries directly into that terminal.

To dynamically change the database, right-click on the server.js file in the project directory, and select "Open in Integrated Terminal". Enter "npm i" in the terminal to install the necessary packages. Enter the command "npm run seed" to add the default data to the database. Then, enter the command "node server.js" and press enter on your keyboard. When the terminal indicates that the connection is successful, open Insomia and begin updating the database using GET, PUT, POST, AND DELETE requests. The base routes will be as follows:
    localhost:3001/api/tags
    localhost:3001/api/categories
    localhost:3001/api/products

## Credits

Starter code provided by UC Berkeley:
https://git.bootcampcontent.com/University-of-California---Berkeley/UCB-VIRT-FSF-PT-06-2024-U-LOLC/-/tree/main/13-ORM/02-Challenge?ref_type=heads

Sequelize data types:
https://sequelize.org/docs/v7/models/data-types/

Many-To-Many relationships:
https://sequelize.org/docs/v7/associations/belongs-to-many/

Sequelize Querying:
https://sequelize.org/docs/v7/category/querying/

PUT requests in Sequelize:
https://dev.to/coscoaj1/how-to-complete-a-put-request-in-sequelize-c54

Sequelize Validations:
https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

Sequelize Finders:
https://sequelize.org/docs/v6/core-concepts/model-querying-finders/

## License

MIT License (located in root directory):
https://github.com/qbres333/13c-E-Commerce_Back_End