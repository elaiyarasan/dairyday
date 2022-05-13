const { Router } = require("express");
const router = Router();

const { getUser,createUser,getAllUser } = require("../controllers/user");
// const { validateToken } = require("../middleware/validate-input")

// router.all("*", validateToken);
// router.get("/:id",validateToken, getUser);
router.post("/create",createUser);
router.get("/list",getAllUser);

module.exports = router;