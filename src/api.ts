import axios, { AxiosResponse } from "axios";
import { InitialPosts, Post } from "./types";

const BASE_URL = "http://localhost:7070/posts";

const getAllPosts = (): Promise<AxiosResponse<InitialPosts[]>> => {
  return axios.get<InitialPosts[]>(BASE_URL);
};

const getPostById = (id: number): Promise<AxiosResponse<InitialPosts>> => {
  return axios.get<InitialPosts>(`${BASE_URL}/${id}`);
};
// Добавление нового поста
const addPost = (newPost: Post): Promise<AxiosResponse<Post>> => {
  return axios.post<Post>(BASE_URL, newPost, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// удаление
const deletePost = (id: number): Promise<AxiosResponse<{}>> => {
  return axios.delete(`${BASE_URL}/${id}`);
};
// редактирование
const editPost = (
  id: number,
  postToUpdate: Post
): Promise<AxiosResponse<Post>> => {
  return axios.put<Post>(`${BASE_URL}/${id}`, postToUpdate, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getAllPosts, getPostById, addPost, deletePost, editPost };
