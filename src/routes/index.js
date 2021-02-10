const authController = require("../controller/authController");
const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const list = require("../controller/listController");
const { authorizeMiddleware } = require("../middleware/authorize");
const task = require("../controller/taskController");

router.post("/api/auth/signup", authMiddleware, authController.signUp);
router.post("/api/auth/signin", authController.signIn);
router.post("/api/lists", authorizeMiddleware, list.createList);
router.get("/api/lists", authorizeMiddleware, list.fetchAll);
router.get("/api/lists/:listId", authorizeMiddleware, list.fetchOne);
router.put("/api/lists/:listId", authorizeMiddleware, list.updateList);
router.delete("/api/lists/:listId", authorizeMiddleware, list.deleteList);

router.post("/api/task", task.create);
router.get("/api/task/:listId/task", task.fetchAll);
router.get("/api/task/taskId", task.fetchOne);
router.put("/api/task/taskId", task.fetchOne);
router.delete("/api/task/taskId", task.fetchOne);

module.exports = router;
