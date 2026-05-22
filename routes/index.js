const router = require('express').Router();

router.use('/', require('./swagger')); // Use the swagger router for /swagger routes

router.get('/', (req, res) => {
    // #swagger.tags = ['Hello World'];
    res.send('Hello World!');
});

router.use('/contacts', require('./contacts')); // Use the contacts router for /contacts routes

module.exports = router;