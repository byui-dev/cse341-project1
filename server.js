const express = require('express');
require('dotenv').config();     

const app = express();

const db = require('./routes/data/database');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', require('./routes'));
app.use(bodyParser.json());

db.initDb((err, database) => {
     if (err) {
          console.error('Failed to connect to the database', err);
          process.exit(1);
     }

     database.listCollections().toArray().then(cols => {
       console.log('Collections:', cols);
     });     
 
     app.listen(PORT, () => { console.log(` Server is running on port ${PORT}`);
  });   
});
