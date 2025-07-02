import express from "express";

const app = express();
const port = 4000;

app.get("/home", (req, res) => {
  res.send("Welcome Home!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
