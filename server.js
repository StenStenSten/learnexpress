const path = require("path");
const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts.js");

const app = express();

const db = require("./models");

// Synchronize the database (this will create the Posts table if it doesn't exist)
db.sequelize.sync({ force: false })  // Set 'force: false' to avoid dropping tables on each restart
    .then(() => {
        console.log("Database synchronized!");
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });

nunjucks.configure(path.join(__dirname, "views"), {
    autoescape: true,
    express: app
});

app.set("view engine", "njk");
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/posts", postsRoutes);

app.get("/", async (req, res) => {
    try {
        const posts = await db.Post.findAll();
        res.render("index", { posts });
    } catch (error) {
        console.error("Error loading posts on home:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/answer", (req, res) => {
    const { page, order } = req.query;
    res.send(`Page: ${page}, Order: ${order}`);
});

app.post("/answer", (req, res) => {
    const { name, age } = req.body;
    console.log(`Name: ${name}, Age: ${age}`);
    res.send(`Form submitted. Name: ${name}, Age: ${age}`);
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
