import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.post("/publish", (req, res) => {
  const { title, content, nama } = req.body;
  const id = posts.length;
  posts.push({ id, title, content, nama });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { content } = req.body; // field yang aman mau diedit
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex !== -1) {
    // Only update content, keep other fields unchanged
    posts[postIndex].content = content;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  posts = posts.filter((post) => post.id !== id); // Remove post with matching ID
  res.redirect("/");
});
app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
2;
