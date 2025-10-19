const router = require("express").Router();

const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getAllItems);
router.post("/", createItem);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);

module.exports = router;
