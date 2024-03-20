import { Link } from "react-router-dom";
import { PostsListProps } from "../types";
import Post from "./Post";

const PostsList: React.FC<PostsListProps> = ({
  posts,

  handlePostClick,
}) => {
  // console.log("posts", posts);
  return (
    <>
      {posts.map((post) => (
        <div
          className='post'
          key={post.id}
          // onClick={() => handlePostClick(post.id)}
        >
          <Post
            post={post}
            // deletePost={deletePost}
            onBodyClick={handlePostClick}
          />
        </div>
      ))}
    </>
  );
};
export default PostsList;
