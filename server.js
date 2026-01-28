import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDb connected")).catch(err => console.error(err));
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);

app.get("/api/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});
app.post("/api/posts", async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});
app.delete("/api/posts/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});
app.put("/api/posts/:id", async (req, res) => {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id, { title, content }, { new: true }
    );
    res.json(updatedPost)
})

app.listen(PORT, () => console.log(`server running on port${PORT}`));
