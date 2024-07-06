import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Export the Express app
export default app;
