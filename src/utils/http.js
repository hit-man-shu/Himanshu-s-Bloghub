import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

// getPost
export const getBlogs = async ({ signal }) => {
  try {
    const resp = await axios.get(
      "https://himanshu-s-bloghub.onrender.com/posts",
      { signal },
    );
    return resp.data.posts;
  } catch (error) {
    throw error;
  }
};

// getSingle Post
export const getSingleBlog = async ({ id, signal }) => {
  try {
    const resp = await axios.get(
      `https://himanshu-s-bloghub.onrender.com/posts/${id}`,
      {
        signal,
      },
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// post Data
export const postBlog = async ({ postData, token }) => {
  try {
    const resp = await axios.post(
      "https://himanshu-s-bloghub.onrender.com/posts",
      postData,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log("Post sucessfully");
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// Put Data
export const updateBlog = async ({ postId, postData, token }) => {
  try {
    const response = await axios.put(
      `https://himanshu-s-bloghub.onrender.com/posts/${postId}`,
      postData, // Pass postData here
      {
        headers: {
          Authorization: token.token,
        },
        data: {
          author: token.username,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete Data
export const deleteBlog = async ({ postId, token }) => {
  try {
    const response = await axios.delete(
      `https://himanshu-s-bloghub.onrender.com/posts/${postId}`,
      {
        headers: {
          Authorization: token.token,
        },
        data: {
          author: token.username,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
