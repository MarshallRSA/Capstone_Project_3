import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = [
    {
        id: "1",
        title: "Young Business Owners: The Future of Entrepreneurship",
        content: "Discover how a new generation of young entrepreneurs is revolutionizing the business world with innovative ideas and bold initiatives.",
        image: "/images/Bridge.jpg"
    },
    {
        id: "2",
        title: "Hipster Coffee Trends: Brewing Up a Revolution",
        content: "Explore the world of hipster coffee trends—from artisanal brews and sustainable bean sourcing to unique cafe cultures that are redefining the experience.",
        image: "/images/coffee.jpg"
    },
    {
        id: "3",
        title: "The Road Less Travelled: Adventures Beyond the Ordinary",
        content: "Join us on a journey off the beaten path as we delve into unconventional travel stories, hidden destinations, and life-changing adventures.",
        image: "/images/railway.jpg"
    }
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { title: "Postcard", posts: blogPosts });
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs", { title: "Contact Me" });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { title: "About Me" });
});

// Display all blog posts
app.get("/blog", (req, res) => {
    res.render("blog.ejs", { title: "Blog", posts: blogPosts });
});

// Show form to create a new blog post
app.get("/blog/new", (req, res) => {
    res.render("new.ejs", { title: "New Blog Post" });
});

// Create a new blog post
app.post("/blog", (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content,
        image: req.body.image || "https://picsum.photos/200/300"
    };
    blogPosts.push(newPost);
    res.redirect("/");
});

// Display a single blog post
app.get("/blog/:id", (req, res) => {
    const post = blogPosts.find(p => p.id === req.params.id);
    console.log("Found post:", post);
    if (!post) return res.send("Post not found");
    res.render("show.ejs", { title: post.title, post });
});

// Show form to edit a blog post
app.get("/blog/:id/edit", (req, res) => {
    const post = blogPosts.find(p => p.id === req.params.id);
    if (!post) return res.send("Post not found");
    res.render("edit.ejs", { title: "Edit Blog Post", post });
});

// Update a blog post
app.post("/blog/:id/update", (req, res) => {
    const index = blogPosts.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.send("Post not found");
    blogPosts[index].title = req.body.title;
    blogPosts[index].content = req.body.content;
    res.redirect("/blog");
});

// Delete a blog post
app.post("/blog/:id/delete", (req, res) => {
    blogPosts = blogPosts.filter(p => p.id !== req.params.id);
    res.redirect("/blog");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});