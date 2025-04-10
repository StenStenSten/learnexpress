const express = require("express");
const {
    listPosts,
    showCreateForm,
    createPost,
    showEditForm,
    updatePost,
    deletePost,
    viewPost  
} = require("../controllers/postsController.js");

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// List all posts
router.get("/", asyncHandler(listPosts));

// Render create form
router.get("/create", asyncHandler(showCreateForm));

// Handle new post creation
router.post("/", asyncHandler(createPost));

// Render edit form
router.get("/edit/:id", asyncHandler(showEditForm));

// Handle post update
router.post("/edit/:id", asyncHandler(updatePost));

// Handle post deletion
router.get("/delete/:id", asyncHandler(deletePost));

// Display a single post
router.get("/:id", asyncHandler(viewPost));  

module.exports = router;
