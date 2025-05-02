import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setContent,
  setThumbnailURL,
  setTitle,
  clearBlog,
} from "../../redux/Slice/blogSlice";

import { Typography, TextField, Button, Box } from "@mui/material";
import CustomImage from "./Components/CustomImage"; // Adjust path if needed

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { publishBlog } from "./Controller/BlogController";
import BlogToolbar from "./Components/BlogToolbar";
const Blog = () => {
  const [user, setUser] = useState(null);
  const [title, setTitleLocal] = useState("");
  const [thumbnailURL, setThumbnailURLLocal] = useState(null);
  const [content, setContentLocal] = useState("");

  const dispatch = useDispatch();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CustomImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          style:
            'style="max-width: 120px; max-height: 120px; width: auto; height: auto; border-radius: 50%;',
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: " ",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const handlePublish = async () => {
    if (!user) {
      console.error("User not authenticated");
      return toast.error("User not authenticated");
    }

    const content = editor.getHTML();
    console.log("Content:", content);
    dispatch(setContent(content));

    try {
      await publishBlog(title, content, user, thumbnailURL);
      console.log("Blog published successfully");
      toast.success("Blog published successfully");
      setTitle("");
      editor.commands.clearContent();
      setThumbnailURLLocal(null);
      dispatch(clearBlog());
      editor.commands.clearContent();
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("Error publishing blog");
    }
  };
  const blogState = useSelector((state) => state.blog);
  useEffect(() => {
    if (blogState.title) setTitleLocal(blogState.title);
    if (blogState.thumbnailURL) setThumbnailURLLocal(blogState.thumbnailURL);
  }, [blogState]);
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(blogState.content);
    setContentLocal(blogState.content);
  }, [editor, editor.content]);
  useEffect(() => {
    if (!editor) return;
    editor.on("update", () => {
      const content = editor.getHTML();
      dispatch(setContent(content));
    });
  }, [editor, dispatch]);

  return (
    <Box
      p={3}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Blog
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => {
          setTitleLocal(e.target.value);
          dispatch(setTitle(e.target.value));
        }}
        sx={{
          borderRadius: 2,
        }}
      />
      <TextField
        label="Thumbnail URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={thumbnailURL}
        onChange={(e) => {
          setThumbnailURLLocal(e.target.value);
          dispatch(setThumbnailURL(e.target.value));
        }}
        sx={{
          borderRadius: 2,
          marginBottom: 3,
        }}
      />
      {thumbnailURL && (
        <Box mt={1}>
          <img
            src={thumbnailURL}
            alt="Thumbnail Preview"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        </Box>
      )}

      <Box
        border={1}
        p={2}
        sx={{ minHeight: 200, mb: 2, borderRadius: 2, alignItems: "center" }}
      >
        <BlogToolbar editor={editor} />
        <EditorContent editor={editor} />
      </Box>
      <Button variant="contained" color="primary" onClick={handlePublish}>
        PublishDocs
      </Button>
    </Box>
  );
};
export default Blog;
