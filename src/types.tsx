import { AxiosResponse } from "axios";

export type InitialPosts = {
  id: number;
  content: string;
  created: number;
};
export type Post = {
  title?: string;
  content: string;
  id?: number;
};
export type CreatePostProps = {
  addPost: (newPost: Post) => Promise<void>;
};
export type PostsListProps = {
  posts: InitialPosts[];
  // deletePost: (id: number) => void;
  handlePostClick: (id: number) => void;
  getAllPosts: () => Promise<AxiosResponse<InitialPosts[]>>;
};

export type PostDetailsProps = {
  // post: InitialPosts | null;
  deletePost: (id: number) => void;
};
export type PostEditProps = {
  currentPost: InitialPosts | null;
  // deletePost: (id: number) => void;
  // add: (id: number) => void;
  edit: (newPost: Post) => Promise<void>;
};

export type PostProps = {
  post: InitialPosts;
  // deletePost: (id: number) => void;
  onBodyClick: (id: number) => void;
  // getPosts: () => Promise<void>;
};
