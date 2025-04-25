import { createBlog } from "../Model/BlogModel";

export const publishBlog = async (title, content, user, thumbnailURL = "") => {
  if (!title || !content || !thumbnailURL) {
    throw new Error("Title , content and thumbnail are required");
  }
  if (!user) {
    throw new Error("User not authenticated");
  }
  return await createBlog(title, content, user, thumbnailURL);
};
