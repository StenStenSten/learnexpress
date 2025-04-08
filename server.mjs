import { fileURLToPath } from "url";
import path from "path";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";  
import postsRoutes from "./routes/posts.js";

const app = express();

// Configure Nunjucks
nunjucks.configure(path.join(__dirname, "views"), {
    autoescape: true,
    express: app
});

app.set("view engine", "njk");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/posts", postsRoutes);

// Serve the home page
app.get("/", (req, res) => {
    res.render("index");
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
