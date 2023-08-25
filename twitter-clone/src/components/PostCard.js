import React, { useState } from "react";
import "./postCard.css";
import photos from "../images/photo.png";
import video from "../images/video.png";
import attachment from "../images/attachment.png";
import schdedule from "../images/schedule.png";
import axios from "axios";

function PostCard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [postDescription, setPostDescription] = useState();
  const currentDate = new Date();
  if (user) {
    var name = user.name;
    var userid = user._id;
  }

  const handlePost = async () => {
    setPostDescription("");
    const tweetData = {
      userid :userid,
      name: name,
      postDescription: postDescription,
      date: currentDate.toISOString(),
      pic: "https://th-i.thgim.com/public/sci-tech/science/dheof9/article28415547.ece/alternates/FREE_1200/Vikram",
    };
    try {
      const res = await axios.post("/api/tweets/create_tweet", tweetData);
      console.log(res);
      window.location.href = "/";
    } catch (error) {
      console.log("faild to tweet");
    }
  };

  return (
    <div className="post">
      <div className="dsc-sec">
        <input
          type="text"
          placeholder="Create new post"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <span onClick={handlePost}>POST</span>
      </div>

      <div className="upload-sec">
        <div className="item">
          <img src={photos} alt="" />
          <span>Photos</span>
        </div>
        <div className="item">
          <img src={video} alt="" />
          <span>Videos</span>
        </div>
        <div className="item">
          <img src={attachment} alt="" />
          <span>Attachment</span>
        </div>
        <div className="item">
          <img src={schdedule} alt="" />
          <span>Schedule</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
