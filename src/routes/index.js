const authController = require("../controller/authController");
const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("yoooo");
});

router.post("/api/auth/signup", authMiddleware, authController.signUp);
router.post("/api/auth/signin", authController.signIn);

module.exports = router;
