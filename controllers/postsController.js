// Import the db object, which contains all the models
const db = require("../models");

// List all posts
async function listPosts(req, res) {
    try {
        const posts = await db.Post.findAll();  // Access Post model from db
        console.log("Fetched posts:", posts);
        res.render("index.njk", { posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Render create form
function showCreateForm(req, res) {
    res.render("posts/create.njk");
}

// Handle new post creation
async function createPost(req, res) {
    try {
        await db.Post.create({
            title: req.body.title,
            body: req.body.body,
        });
        res.redirect("/posts");
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Render edit form
async function showEditForm(req, res) {
    try {
        const post = await db.Post.findByPk(req.params.id);
        if (post) {
            res.render("posts/edit.njk", { post });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error("Error fetching post for editing:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Handle post update
async function updatePost(req, res) {
    try {
        const post = await db.Post.update(
            { title: req.body.title, body: req.body.body },
            { where: { id: req.params.id } }
        );
        if (post[0] === 1) {
            res.redirect("/posts");
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Handle post deletion
async function deletePost(req, res) {
    try {
        const deleted = await db.Post.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.redirect("/posts");
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Internal Server Error");
    }
}

// View single post
async function viewPost(req, res) {
    try {
        const post = await db.Post.findByPk(req.params.id);
        if (post) {
            res.render("posts/answer.njk", { post });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error("Error fetching single post:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    listPosts,
    showCreateForm,
    createPost,
    showEditForm,
    updatePost,
    deletePost,
    viewPost,
};
