const express = require("express");
const usersModule = require("./users/users");
const postsModule = require("./posts/posts");
const commentsModule = require("./comments/comments");
const todosModule = require("./todos/todos");
const albumsModule = require("./albums/albums");
const photosModule = require("./photos/photos");

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Rotas básicas
app.get("/", (req, res) => {
  res.json({ message: "API de Blog/Rede Social", version: "1.0.0" });
});

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Rotas de usuários
app.get("/users", async (req, res) => {
  try {
    const users = await usersModule.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await usersModule.getUserById(parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await usersModule.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await postsModule.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts/user/:userId", async (req, res) => {
  try {
    const posts = await postsModule.getPostsByUserId(parseInt(req.params.userId));
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = await postsModule.createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de comentários
app.get("/comments", async (req, res) => {
  try {
    const comments = await commentsModule.getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/comments/post/:postId", async (req, res) => {
  try {
    const comments = await commentsModule.getCommentsByPostId(parseInt(req.params.postId));
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/comments", async (req, res) => {
  try {
    const newComment = await commentsModule.createComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todosModule.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/todos/:id/complete", async (req, res) => {
  try {
    const todo = await todosModule.markTodoAsCompleted(parseInt(req.params.id));
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = await todosModule.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de álbuns
app.get("/albums", async (req, res) => {
  try {
    const albums = await albumsModule.getAllAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/albums/user/:userId", async (req, res) => {
  try {
    const albums = await albumsModule.getAlbumsByUserId(parseInt(req.params.userId));
    res.json(albums);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de fotos
app.get("/photos", async (req, res) => {
  try {
    const photos = await photosModule.getAllPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/photos/album/:albumId", async (req, res) => {
  try {
    const photos = await photosModule.getPhotosByAlbumId(parseInt(req.params.albumId));
    res.json(photos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Só inicia o servidor se não for em modo de teste
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
