const { Router } = require("express");
const { prueva } = require("../controllers/authController");

const router = Router();

router.get("/", prueva);

module.exports = router;
