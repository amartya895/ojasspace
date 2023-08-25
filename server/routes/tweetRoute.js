const express = require("express");
const Tweet = require("../modals/tweet"); // Make sure the path is correct to your Tweet model
const router = express.Router();

router.post("/create_tweet", async (req, resp) => {
  const {
    userid,
    name,
    pic,
    date,
    postDescription,
    likeCount = 0,
    commentCount = 0,
    shareCount = 0,
  } = req.body;

  try {
    const newTweet = await Tweet.create({
      userid,
      name,
      pic,
      date,
      postDescription,
      likeCount,
      commentCount,
      shareCount,
    });

    await newTweet.save();

    resp.status(201).json({ message: "Tweet Created Successfully" });
  } catch (error) {
    console.error(error);
    resp.status(400).json({ message: "Failed to create tweet" });
  }
});

router.get("/getalltweets" , async(req , resp)=>{
  try {

    const tweets = await Tweet.find({});

    return resp.send(tweets);
    
   } catch (error) {
        return resp.status(400).json({message:error});
   }
})


module.exports = router;
