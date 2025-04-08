import { Router } from "express";
import db from "../models/index.js";  
const router = Router();

// Route to list all posts
router.get("/", async (req, res) => {
    try {
        const posts = await db.Post.findAll();
        console.log("Fetched posts:", posts);  // Log fetched posts

        res.render("index.njk", { posts });  // Pass posts to template
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Route to show the form for creating a new post
router.get("/create", (req, res) => {
    res.render("posts/create.njk");  // Render the create post form
});

// Route to handle the creation of a new post
router.post("/", async (req, res) => {
    await db.Post.create({
        title: req.body.title,
        body: req.body.body,
    });
    res.redirect("/posts");  // Redirect to posts listing page
});

// Route to show the edit form for a post
router.get("/edit/:id", async (req, res) => {
    const post = await db.Post.findByPk(req.params.id);  // Find post by ID
    res.render("posts/edit.njk", { post });  // Render the edit post form with the current post data
});

// Route to handle updating a post
router.post("/edit/:id", async (req, res) => {
    await db.Post.update(
        { title: req.body.title, body: req.body.body },
        { where: { id: req.params.id } }  // Update the post by ID
    );
    res.redirect("/posts");  // Redirect to posts listing page
});

// Route to delete a post
router.get("/delete/:id", async (req, res) => {
    await db.Post.destroy({ where: { id: req.params.id } });  // Delete the post by ID
    res.redirect("/posts");  // Redirect to posts listing page
});

export default router;
