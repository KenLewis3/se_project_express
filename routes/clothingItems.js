const router = require("express").Router();

router.get("/", () => console.log("GET clothing items"));
router.post("/", () => console.log("POST clothing items"));
router.delete("/:itemID", () => console.log("DELETE clothing items by ID"));

module.exports = router;
