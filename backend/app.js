import express from "express";

const app = express();
const port = 5555;

app.get("/home", (req, res) => {
  res.send("Welcome Home!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
