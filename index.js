import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

const db = mysql.createConnection({
  host: "sql101.infinityfree.com",
  user: "if0_39141097",
  dbPass: "hHhSJ8t8k4Irn",
  database: "if0_39141097_shop",
});
// Allow CORS for frontend
app.use(
  cors({
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["*"],
  })
);
//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json("Hello from backend");
});

app.get("/items", (req, res) => {
  const query = "SELECT * FROM prices ORDER BY name ASC";
  db.query(query, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
app.post("/items", (req, res) => {
  const querry = "INSERT into prices(`name`,`desc`,`price`) VALUES(?)";
  const values = [req.body.name, req.body.desc, req.body.price];
  db.query(querry, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  const querry = "DELETE FROM prices WHERE id=?";
  db.query(querry, [id], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  const querry = "UPDATE prices SET `name`=? ,`desc`=? , `price`=? WHERE id=?";

  const values = [
    req.body.data.name,
    req.body.data.desc,
    req.body.data.price,
    id,
  ];
  db.query(
    querry,
    [values[0], values[1], values[2], values[3]],
    (error, data) => {
      if (error) return res.json(error);
      return res.json(data);
    }
  );
});

app.listen(8000, () => {
  console.log("connected to backend");
});
