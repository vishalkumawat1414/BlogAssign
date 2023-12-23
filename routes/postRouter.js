const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Middleware to protect routes that require authentication
router.use(authMiddleware.authenticate);

router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
