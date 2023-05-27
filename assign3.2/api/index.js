import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {MongoClient} from "mongodb";

/* Be sure to use DATABASE_NAME in your call to .db(), so we can change the constant while grading. */
let DATABASE_NAME = "cs193x_assign3";

/* Do not modify or remove this line. It allows us to change the database for grading */
if (process.env.DATABASE_NAME) DATABASE_NAME = process.env.DATABASE_NAME;

let api = express.Router();
let db;
let usersCollection;
let postsCollection;

const initApi = async (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);

  //TODO: Set up database connection and collection variables
  const client = new MongoClient("mongodb://0.0.0.0:27017", { useUnifiedTopology: true });

  await client.connect();

  db = client.db(DATABASE_NAME);
  usersCollection = db.collection('users');
  postsCollection = db.collection('posts');
};

api.use(bodyParser.json());
api.use(cors());

// JSON Parse Error
api.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ error: "Couldn't parse request body as JSON" });
  }
  next();
});

api.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

/*** Test routes ***/

api.get("/tests/get", (req, res) => {
  let value = req.query.value || null;
  res.json({ success: true, value });
});

api.post("/tests/post", (req, res) => {
  let value = req.body.value || null;
  res.json({ success: true, value });
});

api.get("/tests/error", (req, res) => {
  res.status(499).json({ error: "Test error" });
});

api.all("/tests/echo", (req, res) => {
  res.json({
    method: req.method,
    query: req.query,
    body: req.body
  });
});

/*** Generic Social Media API ***/

//TODO: Add endpoints


// GET /users API
api.get("/users", async (req, res) => {

  // Return all users
  const users = await usersCollection.find().toArray();
  res.json({ users: users.map(user => user.id) });
});


// GET /users/:id API
api.get("/users/:id", async (req, res) => {

  // Find User
  const user = await usersCollection.findOne({ id: req.params.id });

  // No User Found Error
  if (!user) return res.status(404).json({ error: "No user with ID " + req.params.id });

  // Return User
  res.json({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    following: user.following
  });
});


// POST /users API
api.post("/users", async (req, res) => {

  const userId = req.body.id;

  // Missing id Error
  if (!userId) return res.status(400).json({ error: "Missing id" });

  // User Exists Error
  const userExists = await usersCollection.findOne({ id: userId });
  if (userExists) return res.status(400).json({ error: `${userId} already exists` });

  // Insert New User
  const user = { id: userId, name: userId, avatarURL: "images/default.png", following: [] };
  await usersCollection.insertOne(user);

  // Return result
  res.json({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    following: user.following
  });
});


// PATCH /users/:id API
api.patch("/users/:id", async (req, res) => {

  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.avatarURL) updates.avatarURL = req.body.avatarURL;

  // No User Found Error
  const user = await usersCollection.findOne({ id: req.params.id });
  if (!user) return res.status(404).json({ error: "No user with ID " + req.params.id });

  // Find and Update User
  await db.collection('users').findOneAndUpdate(
    { id: req.params.id },
    { $set: updates },
    { returnOriginal: false }
  );

  // Return Edited User
  user = await usersCollection.findOne({ id: req.params.id });
  res.json({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    following: user.following
  });
});


// GET /users/:id/feed API
api.get("/users/:id/feed", async (req, res) => {

  // No User Found Error
  const user = await usersCollection.findOne({ id: req.params.id });
  if (!user) {
    res.status(404).json({ error: `No user with ID ${req.params.id}` });
    return;
  }

  // Following Users
  const userIds = [...user.following, user.id];

  // Collect Posts
  const posts = await postsCollection.find({ userId: { $in: userIds } }).sort({ time: -1 }).toArray();

  // Collect User Details
  const userMap = {};
  for (const userId of userIds) {
    const userDetails = await usersCollection.findOne({ id: userId });
    userMap[userId] = userDetails;
  }

  // Return the posts as an array
  const formattedPosts = posts.map(post => {
    return {
      user: {
        id: post.userId,
        name: userMap[post.userId].name,
        avatarURL: userMap[post.userId].avatarURL
      },
      time: post.time,
      text: post.text
    };
  });
  return res.json({ posts: formattedPosts });
});


// POST /users/:id/posts API
api.post("/users/:id/posts", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  // No User Found Error
  const user = await usersCollection.findOne({ id });
  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }

  // Missing text Error
  if (!text) {
    res.status(400).json({ error: "Missing text" });
    return;
  }
  
  // Insert Post
  const post = { userId: user.id, time: new Date(), text };
  await postsCollection.insertOne(post);
  res.json({ success: true });
});


// POST /users/:id/follow API
api.post("/users/:id/follow", async (req, res) => {
  const { id } = req.params;
  const { target } = req.query;

  // No User Found Error
  const user = await usersCollection.findOne({ id });
  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }

  // Missing target Error
  if (!target) {
    res.status(400).json({ error: "Missing target" });
    return;
  }

  // No Target User Found Error
  const targetUser = await usersCollection.findOne({ id: target });
  if (!targetUser) {
    res.status(404).json({ error: `No user with ID ${target}` });
    return;
  }

  // Same User and Target User Error
  if (id === target) {
    res.status(400).json({ error: `Can't follow yourself` });
    return;
  }

  // Already following Target User Error
  if (id === target || user.following.includes(target)) {
    res.status(400).json({ error: `${id} is already following ${target}` });
    return;
  }

  // Add Target to following
  user.following.push(target);
  await usersCollection.updateOne({ id }, { $set: user });
  res.json({ success: true });
});


// DELETE /users/:id/follow API
api.delete("/users/:id/follow", async (req, res) => {
  const { id } = req.params;
  const { target } = req.query;
  
  // No User Found Error
  const user = await usersCollection.findOne({ id });
  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }

  // Missing target Error
  if (!target) {
    res.status(400).json({ error: "Missing target" });
    return;
  }

  // Not follwoing Error
  const targetIndex = user.following.indexOf(target);
  if (targetIndex === -1) {
    res.status(400).json({ error: `${id} is not following ${target}` });
    return;
  }

  // Remove follwing target
  user.following.splice(targetIndex, 1);
  await usersCollection.updateOne({ id }, { $set: user });
  res.json({ success: true });
});

/* Catch-all route to return a JSON error if endpoint not defined.
   Be sure to put all of your endpoints above this one, or they will not be called. */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

export default initApi;
