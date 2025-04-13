const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./models/postmodel"); 

const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 5000;

app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts.map(post => ({
        id: post._id,              
        title: post.title,
        status: post.status
    })));
});

app.post("/posts", async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({
        id: newPost._id,
        title: newPost.title,
        status: newPost.status
    });
});

app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json({
        id: post._id,
        title: post.title,
        status: post.status
    });
});

app.put("/posts/:id", async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
        return res.status(404).json({ message: "Post not found for update" });
    }
    res.json({
        id: updatedPost._id,
        title: updatedPost.title,
        status: updatedPost.status
    });
});

app.delete("/posts/:id", async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
        return res.status(404).json({ message: "Post not found for deletion" });
    }
    res.status(204).send();
});

app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});
