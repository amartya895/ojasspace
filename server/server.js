const cors = require("cors");
const express = require("express");

const dbconfig = require("./db.js");
const usersRoute = require('./routes/userRoute.js');
const tweetRoute = require('./routes/tweetRoute.js');

const app = express();

const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: "https://ojasspace.vercel.app/",
   
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/tweets", tweetRoute);


app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});