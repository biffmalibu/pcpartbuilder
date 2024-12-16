# PCPartBuilder

###

PCPartBuilder is a web application built using Vue.js, Node.js, Express, and MySQL. This application will allow you to create computer builds manually or automatically and share them with friends. Currently, only CPU components are supported. Below are instructions to run PCPartBuilder locally.

### Installation

1. Install Node.js
2. Clone or download this repository
3. Import database/db.sql into a relational database supported be Sequelize (Postgres, MySQL, MariaDB, SQLite... etc)
4. Modify .../backend/nodejs-express/app/config/db.config.js/ to contain your database credentials and dialect.
5. In your terminal, open .../backend/nodejs-express/
6. Start the node.js server with this command 
   ```sh
   npm start server.js
   ```
7. In your terminal, open .../frontend/
8. Start the Vue deployment server with this command
   ```sh
   npm run serve
   ```
9. Go to the browser and access http://localhost:8081



