import { createBlog } from "../Model/BlogModel";

export const publishBlog = async (title, content, user) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }
  if (!user) {
    throw new Error("User not authenticated");
  }
  return await createBlog(title, content, user);
};
