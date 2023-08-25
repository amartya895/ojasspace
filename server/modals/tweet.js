const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  userid :{
    type:String,
    required:true
  },
  name: { type: String, required: true },
  pic: String,
  date: { type: Date, required: true },
  postDescription: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
