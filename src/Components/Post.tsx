import React from "react";
import { InitialPosts, PostProps } from "../types";
import { Link } from "react-router-dom";
import { getTimeAgo } from "./Functions/timeUtils";
import avatarImage from "./assets/avatar.jpg";

const Post: React.FC<PostProps> = ({ post, onBodyClick }) => {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <div className='post'>
          <div className='post-header'>
            <img className='avatar' src={avatarImage} alt='avatar' />
            <div className='who-main'>
              <span className='nameOf'>
                <p>Name</p>
              </span>
              <p className='who'>
                who is {"_"}
                <span className='time'>{getTimeAgo(post.created)}</span>
              </p>
            </div>
          </div>
          <div className='post-body'>
            <h2>{post.content}</h2>
          </div>

          <div className='usless-btn'>
            <button>like</button>
            <button>comment</button>
          </div>
          <div className='footer-btn'></div>
          <input type='text' placeholder='не пишите комментарий' />
        </div>
      </Link>
    </>
  );
};
export default Post;
