const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

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

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((deletedItem) =>
      res.status(200).send({ message: "Clothing item deleted.", deletedItem })
    )
    .catch(() => {
      res.status(500).send({ message: "Error deleting the clothing item." });
    });
};

const likeItem = (req, res) => {
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Clothing item not found." });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error liking clothing item." });
    });
};

const dislikeItem = (req, res) => {
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Clothing item not found." });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "Error disliking clothing item." });
    });
};

module.exports = {
  createItem,
  getAllItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
