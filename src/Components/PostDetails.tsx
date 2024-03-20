import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { InitialPosts, PostDetailsProps } from "../types";
import { getTimeAgo } from "./Functions/timeUtils";
import avatarImage from "./assets/avatar.jpg";

const PostDetails: React.FC<PostDetailsProps> = ({ deletePost }) => {
  const navigate = useNavigate();
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (post) {
      deletePost(post.id);
    }
  };
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<InitialPosts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:7070/posts/${id}`);
        console.log("postdetails response", response.data.post);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }
  const handleEditClick = () => {
    console.log(post.id);
    navigate(`/posts-edit/${post.id}`);
  };
  const handleCancelClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className='post-details'></div>
      <div className='post'>
        <div className='post-header'>
          <img className='avatar' src={avatarImage} alt='avatar' />

          <div className='who-main'>
            <span className='nameOf'>
              <p>Name</p>
            </span>
            <p className='who'>
              who is _<span className='time'>{getTimeAgo(post.created)}</span>
            </p>
          </div>
          <span className='nameOf-edit'>
            <button className='cancel' onClick={handleCancelClick}>
              ✖
            </button>
          </span>
        </div>
        <div className='post-body'>
          <h2>{post.content}</h2>
        </div>
        <div className='usless-btn'>
          <button>like</button>
          <button>comment</button>
        </div>
        <div className='footer-btn'>
          <button onClick={handleEditClick}>изменить</button>
          <button onClick={handleDeleteClick}>удолить</button>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
