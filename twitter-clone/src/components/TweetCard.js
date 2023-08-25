import React from "react";
import "./tweetCard.css";
import pp from "../images/user.png";
import more from "../images/more.png";
import like from "../images/like.png";
import cmt from "../images/comment.png";
import retweet from "../images/retweet.png";
import share from "../images/share.png";

function TweetCard({name , date , cmtcount , likecount , postdsc ,sharecount}) {
  return (
    <div className="tweet-card">
      <img className="pp" src={pp} alt="" />
      <div className="tweet-info">
        <div className="user-info">
          <div className="user">
            <h3>{name}</h3>
            <p>@testing</p>
          </div>
          <img src={more} alt="" />
        </div>
        <p style={{ paddingTop: "5px", color: "#b1afaf" }}>{date}</p>
        <p className="tweet-dsc">
          {postdsc}....
        </p>
        <p className="readMore">Read more</p>
        <div className="tweet-action">
          <div className="action">
            <img src={like} alt="" />
            <p>Like</p>
            <p>{likecount}</p>
          </div>
          <div className="action">
            <img src={retweet} alt="" />
            <p>Retweet</p>
            
          </div>
          <div className="action">
            <img src={cmt} alt="" />
            <p>Comment</p>
            <p>{cmtcount}</p>
          </div>
          <div className="action-share">
            <img src={share} alt="" />
            <p className="shareP">{sharecount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
