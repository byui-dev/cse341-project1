const express = require('express');
const app = express();

const mongodb = require('./routes/data/database');

const port = process.env.PORT || 3500;

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
 if(err) {
  console.log(err);
 } else {
      app.listen(port, () => {console.log(` Database is listening and node running on port ${port}`)});
 }   
});
