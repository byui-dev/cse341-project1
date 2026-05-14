const router = require('express').Router();

// router.get('/', (req, res) => { res.send('Hello World!');});

router.use('/contacts', require('./contacts')); // Use the contacts router for /contacts routes

module.exports = router;