const express = require('express');
require('dotenv').config();     

const app = express();
const db = require('./routes/data/database');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.use("/", require("./routes"));

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
