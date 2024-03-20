import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { InitialPosts, Post } from "./types"; // Импортировать Post
import { getAllPosts, addPost, deletePost, getPostById, editPost } from "./api"; // Импортировать getPostById
import PostsList from "./Components/PostsList";
import Hederr from "./Components/Hederr";
import CreatePost from "./Components/CreatePost";
import PostDetails from "./Components/PostDetails";
import { useNavigate } from "react-router-dom";
import PostEdit from "./Components/PostEdit";

const App: React.FC = () => {
  const navigate = useNavigate();

  const [initialPosts, setInitialPosts] = useState<InitialPosts[]>([]);
  const [currentPost, setCurrentPost] = useState<InitialPosts | null>(null);

  useEffect(() => {
    getAllPosts()
      .then((response) => {
        // console.log("response.data", response.data);
        setInitialPosts(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleDeleteCard = (id: number) => {
    deletePost(id)
      .then(() => {
        getAllPosts().then((response) => {
          setInitialPosts(response.data);
        });
        navigate("/");
      })
      .catch((error: any) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleAddPost = async (updatedPost: Post): Promise<void> => {
    try {
      console.log("updatedPost", updatedPost);
      await addPost(updatedPost);
      const response = await getAllPosts();
      setInitialPosts(response.data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const handleEditPost = async (updatedPost: Post): Promise<void> => {
    try {
      console.log("updatedPost", updatedPost);
      if (typeof updatedPost.id === "undefined") {
        throw new Error("ID поста неопределен");
      }

      const id = updatedPost.id;

      const postToUpdate = {
        title: updatedPost.title,
        content: updatedPost.content,
      };

      await editPost(id, postToUpdate);
      const response = await getAllPosts();
      setInitialPosts(response.data);
    } catch (error) {
      console.error("Ошибка при редактировании поста:", error);
    }
  };

  const handlePostClick = async (id: number) => {
    try {
      const response = await getPostById(id);
      setCurrentPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  return (
    <>
      <div className='App'>
        <Hederr />
        <Routes>
          <Route
            path='/'
            element={
              <PostsList
                posts={initialPosts}
                handlePostClick={handlePostClick}
                getAllPosts={getAllPosts}
              />
            }
          />
          <Route path='/new' element={<CreatePost addPost={handleAddPost} />} />
          <Route
            path='/posts/:id'
            element={<PostDetails deletePost={handleDeleteCard} />}
          />

          <Route
            path='/posts-edit/:id'
            element={
              <PostEdit currentPost={currentPost} edit={handleEditPost} />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
