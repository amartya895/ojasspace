const cors = require("cors");
const express = require("express");

const dbconfig = require("./db.js");
const usersRoute = require('./routes/userRoute.js');
const tweetRoute = require('./routes/tweetRoute.js');

const app = express();

const port = process.env.PORT || 5000;


const allowedOrigins = ['https://ojasspace-amartya895.vercel.app'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // if needed
}));

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/tweets", tweetRoute);


app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});