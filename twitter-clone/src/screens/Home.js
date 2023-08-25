import React, { useState, useEffect } from "react";
import "./home.css";
import PostCard from "../components/PostCard";
import TweetCard from "../components/TweetCard";
import axios from "axios";
import userPic from "../images/user.png";
function Home() {
  const [tweets, setTweets] = useState([]);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    var username = user.name;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Trying to fetch data");
        const data = (
          await axios.get(
            "https://ojasspace-backend.onrender.com/api/tweets/getalltweets" //to use for local development
          )
        ).data;
        console.log("Data fetched successfully");
        console.log(data);
        setTweets(data);
      } catch (error) {
        console.log("Something went wrong");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="main-home">
        <div className="home-left">
          <img className="profile-pic" src={userPic} alt="" />

          <div className="up"></div>
          <div className="down">
            <h2>{username}</h2>
            <p style={{ color: "#4a4a4a", marginTop: "5px" }}>@testing</p>
            <div className="follow">
              <div className="following">
                <h3>3</h3>
                <p style={{ color: "#4a4a4a", marginTop: "5px" }}>Following</p>
              </div>
              <div className="follower">
                <h3>0</h3>
                <p style={{ color: "#4a4a4a", marginTop: "5px" }}>Follower</p>
              </div>
            </div>
            <p className="findnew">Find new people</p>
          </div>
        </div>
        <div className="home-right">
          <PostCard />
          {tweets &&
            tweets.map((tweet, index) => (
              <TweetCard
                key={index}
                name={tweet.name}
                date={tweet.date}
                cmtcount={tweet.commentCount}
                likecount={tweet.likeCount}
                postdsc={tweet.postDescription}
                sharecount={tweet.shareCount}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
