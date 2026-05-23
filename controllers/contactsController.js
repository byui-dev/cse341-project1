const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Contacts'];
  try {
    const result = await mongodb.getDatabase().collection("Contacts").find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error retrieving contacts." });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts'];
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Invalid format for contact ID." });
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("Contacts")
      .find({ _id: contactId });
    const contacts = await result.toArray();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json(contacts[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error retrieving contact." });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts'];
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // FIX: Changed replaceOne to insertOne and removed the undefined contactId variable
    const response = await mongodb
      .getDatabase()
      .collection("Contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId }); // 201 Created is proper for POST
    } else {
      res.status(500).json("Some error occurred while creating the contact.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts'];
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Invalid format for contact ID." });
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    // FIX: Removed the extra .db() call
    const response = await mongodb
      .getDatabase()
      .collection("Contacts")
      .replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json(
          "No contact modified. Make sure the body data is different or the ID is correct.",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts'];
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Invalid format for contact ID." });
    }
    const contactId = new ObjectId(req.params.id);

    // FIX: Changed deprecated .remove() to modern .deleteOne() and fixed .db() chain
    const response = await mongodb
      .getDatabase()
      .collection("Contacts")
      .deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("Contact not found to delete.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
