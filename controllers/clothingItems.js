const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = "6713cf937623fbdb3a24cfd4"; // Temporary hardcoded owner ID

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Invalid clothing item data provided." });
      }
      return res.status(500).send({
        message: "Error creating the clothing item.",
        err,
      });
    });
};

const getAllItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred while retrieving items." });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      res.status(500).send({ message: "Error updating the clothing item." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ message: "Clothing item deleted." }))
    .catch((err) => {
      res.status(500).send({ message: "Error deleting the clothing item." });
    });
};

module.exports = { createItem, getAllItems, updateItem, deleteItem };
