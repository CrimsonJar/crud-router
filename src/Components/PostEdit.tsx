import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { InitialPosts, Post, PostDetailsProps, PostEditProps } from "../types";
import { getTimeAgo } from "./Functions/timeUtils";
import avatarImage from "./assets/avatar.jpg";

const PostEdit: React.FC<PostEditProps> = ({ currentPost, edit }) => {
  const [currentContent, setCurrentContent] = useState(currentPost?.content);
  const [post, setPost] = useState<InitialPosts | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:7070/posts/${id}`);
        setPost(response.data.post);
        setCurrentContent(response.data.post.content);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleCancelClick = () => {
    navigate("/");
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentContent(event.target.value);
  };
  const handleSaveEditClick = async () => {
    if (id && currentContent && post) {
      console.log("id=" + id + " currentContent=" + currentContent + " post");
      try {
        const updatedPost: Post = {
          ...post,
          content: currentContent,
          id: parseInt(id),
        };
        await edit(updatedPost);
        navigate("/");
      } catch (error) {
        console.error("Error saving post:", error);
      }
    } else {
      console.error("Missing post data");
    }
  };

  return (
    <>
      <div className='post-details'></div>
      <div className='post'>
        <div className='headOfHeader'>
          <h3> Редактировать публикацию</h3>
        </div>
        <div className='post-header'>
          <img className='avatar' src={avatarImage} alt='avatar' />
          <div className='who-main'>
            <span className='nameOf'>
              <p>Name</p>
            </span>
            <p className='who'>
              who is <span className='time'>{getTimeAgo(post.created)}</span>
            </p>
          </div>
          <span className='nameOf-edit'>
            <button className='cancel' onClick={handleCancelClick}>
              ✖
            </button>
          </span>
        </div>
        <div className='post-body'>
          <textarea value={currentContent} onChange={handleContentChange} />
        </div>
        <div className='usless-btn'>всякие кнопочки</div>
        <div className='footer-btn'>
          <button onClick={handleSaveEditClick}>Схоронить</button>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
