const mongodb = require('../routes/data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection('Contacts').find();
  const contacts = await result.toArray();

        res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('Contacts').find({ _id: contactId });
    const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
};

module.exports = {
    getAll,
    getSingle
};

