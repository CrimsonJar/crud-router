import { useState } from "react";
import { CreatePostProps, Post } from "../types";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC<CreatePostProps> = ({ addPost }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const handleCancelClick = () => {
    navigate("/");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addPost({ title: "Default Title", content });
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='post-edit'>
          <div className='post-header-edit'>
            <div className='who-main-edit'>
              <span className='nameOf-edit'>
                <p>Публикация</p>
              </span>
              <span className='nameOf-edit'>
                <p>фото/видео</p>
              </span>
              <span className='nameOf-edit'>
                <p>кривой эфир</p>
              </span>
              <span className='nameOf-edit'>
                <p>ещё</p>
              </span>
              <span className='nameOf-edit'>
                <button className='cancel homeland' onClick={handleCancelClick}>
                  ✖
                </button>
              </span>
            </div>
          </div>
          <div className='post-body-edit'>
            <textarea
              className='post-content-edit'
              rows={4}
              cols={50}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='footer-btn'>
            <button type='submit' className='publish'>
              Publish
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreatePost;
